console.log("hello")

function tagListHandler(e) {
  console.log(e.target)
}

document.getElementById('tag_list').addEventListener('click', tagListHandler)
