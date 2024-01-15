
//return the last city searches
function loadHistory() {
  let history =  JSON.parse(localStorage.getItem("history"));
  if (history == null)
    history = [];
  return history;
}


