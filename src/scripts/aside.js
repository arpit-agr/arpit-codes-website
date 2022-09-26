// asides 
// https://github.com/jlengstorf/jason.af/blob/main/.eleventy.js#L165-L178
const asides = document.querySelectorAll(".aside-phrase");
Array.from(asides).forEach((fnLink) => {
    fnLink.addEventListener("click", (event) => {
    event.preventDefault();
    const [, id] = event.target.href.split("#");
    const aside = document.querySelector(`#${id} details`);
    aside.open = !aside.open;
    });
});