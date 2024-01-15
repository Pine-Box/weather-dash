
//return the last city searches
export function loadHistory() {
  let history =  JSON.parse(localStorage.getItem("history"));
  if (history == null)
    history = [];
  return history;
}


