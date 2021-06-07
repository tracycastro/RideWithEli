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
    if (window.scrollY > 100) {
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
        progressValue.innerHTML = `<progress id="file" class="bar" max="100" value=${progressBar}></progress>`;
    })
    .catch(handleError);


