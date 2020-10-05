export const NEXT_QUESTION = "NEXT_QUESTION";
export const CHANGE_QUESTION  = "CHANGE_QUESTION";
export const SUBMITTED_QUESTION = "SUBMITTED_QUESTION";

export const RESULT = window.suvery_data.result;
export const replace_recall = (e, q) => {
    var div = document.createElement("div");
    div.innerHTML = e;
    var ems = div.querySelectorAll("em");
    for (var i = 0; i < ems.length; i++) {
      var em = ems[i];
      var id = parseInt(em.getAttribute("data-id"));
        var span = document.createElement("span");
        span.innerHTML = q[id - 1].text;
        em.parentNode.insertBefore(span, em);
        em.remove();
    }


    var content = div.innerHTML;   
    return content;
}
