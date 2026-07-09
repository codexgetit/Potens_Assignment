/**
 * Service to handle local storage access for complaints history and draft storage.
 */
const HISTORY_KEY = 'potens_history';
const DRAFT_KEY = 'potens_draft';

export const storageService = {
  /**
   * Retrieves all submitted reports from history.
   */
  getHistory() {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse reports history from local storage:', e);
      return [];
    }
  },

  /**
   * Appends a new report to history.
   */
  saveReport(report) {
    try {
      const history = this.getHistory();
      const updated = [report, ...history];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save report to local storage:', e);
      return [];
    }
  },

  /**
   * Deletes a report from history by its Reference ID.
   */
  deleteReport(referenceId) {
    try {
      const history = this.getHistory();
      const updated = history.filter(item => item.referenceId !== referenceId);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to delete report from local storage:', e);
      return [];
    }
  },

  /**
   * Clears all reports history.
   */
  clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
  },

  /**
   * Retrieves active draft.
   */
  getDraft() {
    try {
      const data = localStorage.getItem(DRAFT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Saves a draft report.
   */
  saveDraft(draft) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  },

  /**
   * Deletes the active draft.
   */
  clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
  }
};

export default storageService;
