let memberCount = 1;
let scholarCount = 1;

function newMemberInput(){
    memberCount += 1;
    document.getElementById("#members").insertAdjacentHTML("beforeend", `<input class="form-control" type="text" placeholder="Membro" name="member${memberCount}" required>`);
}

function newSchoolarInput(){
    scholarCount += 1;
    document.getElementById("scholars").insertAdjacentHTML("beforeend", `<input class="form-control" type="text" placeholder="Membro" name="member${scholarCount}" required>`);
}

document.getElementById("formAuthors").addEventListener("submit", () => {

});

