function handleError(err) {
    console.log("OH NO!");
    console.log(err);
}

const days = document.querySelector(".days");
const ride = document.querySelector(".ride");
const target = document.querySelector(".target");
const remaining = document.querySelector(".remaining");
const endpoint = "https://mssociety.donordrive.com/api/1.3/participants/38761?_=1622152610601";
const eliPromise = fetch(endpoint);
const rideDate = new Date('10/02/2021');
const today = new Date();
const difference = rideDate.getTime() - today.getTime();
const countdown = Math.ceil(difference / (1000 * 3600 * 24));
const progressValue = document.querySelector(".progress");

// shrink on scroll
const heroImage = document.querySelector(".ride-with-eli");

document.addEventListener('scroll', function() {
    if (window.scrollY > 75) {
        heroImage.width = "320";
        // console.log("hey!");
    } else {
        heroImage.width = "400";
    }
});

// JSON DATA in Paragraph

eliPromise
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        console.log(data.displayName);
        console.log(data.fundraisingGoal);
        console.log(data.sumDonations);
        console.log(data.eventName)
        ride.innerHTML = `${data.eventName}`;
        target.innerHTML = `${data.fundraisingGoal}`;
        remaining.innerHTML = `${(data.fundraisingGoal) - (data.sumDonations)}`;
        days.innerHTML = `${countdown}`;
        const progressBar = (data.sumDonations / data.fundraisingGoal) * 100;
        console.log(`${progressBar}% is current donations`);
        progressValue.innerHTML = `<div class="progress-wrapper"><div class = "progress-bar-bg"><div class = "progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:${progressBar}%"></div></div></div>
        <p class = "raised">$${data.sumDonations} Raised</p><p class = "goal">Goal $${data.fundraisingGoal}</p>`;

    })
    .catch(handleError);


