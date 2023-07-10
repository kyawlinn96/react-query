type SearchHistoryProps = {
  id: number;
  shopId: number;
  name: string;
  imageUrl: string;
};
export function setSearchHistory(searchHistory: SearchHistoryProps, type = 1) {
  const oldHistory = getHistory();

  oldHistory.push({
    type: type,
    id: searchHistory.id,
    name: searchHistory.name,
    shopId: searchHistory.shopId,
    imageUrl: searchHistory.imageUrl || '',
  });

  if (oldHistory.length > 7) {
    const result = oldHistory.slice(Math.max(oldHistory.length - 10, 0));
    localStorage.setItem('SearchHistory', JSON.stringify(result));
  } else localStorage.setItem('SearchHistory', JSON.stringify(oldHistory));
}

export function getHistory() {
  const history = localStorage.getItem('SearchHistory');
  const temp = JSON.parse(history!);
  if (!history || !Array.isArray(temp)) {
    localStorage.removeItem('SearchHistory');
    return [];
  } else {
    return temp;
  }
}
