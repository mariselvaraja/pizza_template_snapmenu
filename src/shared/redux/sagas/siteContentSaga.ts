import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  fetchSiteContentRequest, 
  fetchSiteContentSuccess, 
  fetchSiteContentFailure,
  setSiteContent
} from '../slices/siteContentSlice';
import { siteContentService } from '../../services';

// Worker Saga
function* fetchSiteContentSaga(): Generator<any, void, any> {
  try {
    const siteContentData = yield call(siteContentService.getSiteContent);
    yield put(fetchSiteContentSuccess(siteContentData));
  } catch (error) {
    yield put(fetchSiteContentFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

// Additional saga for fetching specific site content section
function* fetchSiteContentSectionSaga(action: { type: string, payload: string }): Generator<any, void, any> {
  try {
    const sectionData = yield call(siteContentService.getSiteContentSection, action.payload);
    // Here we're not using the data directly since it's just a section
    // In a real app, you might want to update only a specific part of the state
    console.log(`Fetched site content section: ${action.payload}`, sectionData);
  } catch (error) {
    console.error(`Error fetching site content section ${action.payload}:`, error);
  }
}

// Watcher Saga
export function* siteContentSaga(): Generator<any, void, any> {
  yield takeLatest(fetchSiteContentRequest.type, fetchSiteContentSaga);
  yield takeLatest('siteContent/fetchSiteContentSection', fetchSiteContentSectionSaga);
}
