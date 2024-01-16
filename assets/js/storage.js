
//return the last city searches

const history_key = "history";
export function loadHistory() {
  let history =  JSON.parse(localStorage.getItem(history_key));
  if (history == null)
    history = [];
  return history;
}

//store city search to local storage
export function storeHistory(city) {
  let history = loadHistory();
  history.push({"city": city});
  localStorage.setItem(history_key, JSON.stringify(history));
}




