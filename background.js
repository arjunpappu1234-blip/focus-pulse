// Background service worker
console.log('✅ FocusPulse running — all data local');

// Listen for tab changes — detect distractions
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url) {
    // Save visit locally — NOT sent anywhere!
    chrome.storage.local.get(['tabVisits'], (result) => {
      let visits = result.tabVisits || [];
      visits.push({
        url: tab.url,
        timestamp: new Date().toISOString()
      });
      // Keep only last 100 entries to save space
      if (visits.length > 100) visits.shift();
      chrome.storage.local.set({ tabVisits: visits });
    });
  }
});