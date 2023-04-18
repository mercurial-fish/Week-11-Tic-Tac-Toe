//How to grab elements:

let p = $("#test");
let div = $(".my-class");
let ul = $("ul");

console.log(p);
console.log(div);
console.log(ul);
console.log(p.text());
p.text("New Text");

$("input").attr("placeholder", "Placeholder Text");

div.prepend("<p>prepended paragraph</p>");
div.append("<p>appended paragraph</p>");
div.before("<p>added before the div</p>");
div.after("<p>added after div</p>");

// //append, prepend, before, after

// //what is an api?


div.empty(); //emptied it out
ul.remove();// completely removed

$("input").hide();
setTimeout(() => $("input").show(), 2000);

//REVIEW - AJAX - asynchronous javascript and XML
// allows us to send a request and get data back without having to reload the page
// will use get and post

$.get("https://reqres.in/api/users/2", (data) => console.log(data));
$.post("https://reqres.in/api/users/2", {
    name: "Tommy",
    job: "Front end Developer"
}, (data) => console.log(data));