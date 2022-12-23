let memberCount = 1;

function newMemberInput(){
    memberCount += 1;
    document.getElementById("#members").insertAdjacentHTML("beforeend", `<input class="form-control" type="text" placeholder="Membro" name="member${memberCount}" required>`));
}

function newSchoolarInput(){
    document.getElementById("#schoolars").insertAdjacentHTML("beforeend", () => {
        
    });
}

document.getElementById("formAuthors").addEventListener("submit", () => {

});

