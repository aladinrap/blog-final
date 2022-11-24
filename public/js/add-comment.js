const addComment = document.querySelectorAll(".comment-section");
const commentContainer = document.getElementsByClassName("comment-container");

addComment.forEach( (button,i) => {
    button.addEventListener("click", () => {
        if(commentContainer[i].style.display == 'block')
        { commentContainer[i].style.display = 'none' }
        else {
            commentContainer[i].style.display = 'block';
        }
    } )
});