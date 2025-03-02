document.addEventListener("DOMContentLoaded", () => {
  let participantCount = 1;
  const participantsFieldset = document.querySelector(".participants");
  const addButton = document.createElement("button");
  addButton.textContent = "Add Participant";
  addButton.type = "button";
  addButton.addEventListener("click", addParticipant);
  participantsFieldset.appendChild(addButton);

  function addParticipant() {
    participantCount++;
    const newParticipant = document.createElement("section");
    newParticipant.classList.add(`participant${participantCount}`);
    newParticipant.innerHTML = `
      <p>Participant ${participantCount}</p>
      <div class="item">
        <label for="fname${participantCount}"> First Name<span>*</span></label>
        <input id="fname${participantCount}" type="text" name="fname" required />
      </div>
      <div class="item activities">
        <label for="activity${participantCount}">Activity #<span>*</span></label>
        <input id="activity${participantCount}" type="text" name="activity" />
      </div>
      <div class="item">
        <label for="fee${participantCount}">Fee<span>*</span></label>
        <input id="fee${participantCount}" type="number" name="fee" required />
      </div>
    `;
    participantsFieldset.insertBefore(newParticipant, addButton);
  }

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const fees = [...document.querySelectorAll("[id^=fee]")].map(
      (input) => Number(input.value) || 0
    );
    const totalFee = fees.reduce((sum, fee) => sum + fee, 0);
    const adultName = document.querySelector("#fname").value;
    const summary = document.createElement("div");
    summary.innerHTML = `<p>Thank you ${adultName} for registering. You have registered ${participantCount} participants and owe $${totalFee} in fees.</p>`;
    
    document.body.innerHTML = "";
    document.body.appendChild(summary);
  });
});

