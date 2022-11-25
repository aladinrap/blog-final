const commentSection = document.querySelectorAll(".comment-section");
const commentContainer = document.getElementsByClassName("comment-container");

const addComment = document.querySelectorAll(".add-comment");
const addCommentSection = document.getElementsByClassName("add-comment-section");



addComment.forEach( (commBtn, i) => {
    commBtn.addEventListener("click", () => {
        if(addCommentSection[i].style.display == 'block')
        { addCommentSection[i].style.display = 'none' }
        else {
            addCommentSection[i].style.display = 'block';
        }
    })
});

commentSection.forEach( (button,i) => {
    button.addEventListener("click", () => {
        if(commentContainer[i].style.display == 'block')
        { commentContainer[i].style.display = 'none' }
        else {
            commentContainer[i].style.display = 'block';
        }
    } )
});