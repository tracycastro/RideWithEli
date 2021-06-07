function handleError2(err) {
    console.log("OH NO! 2");
    console.log(err);
}
const myList = document.querySelector('ul');
const endpoint2 = "https://mssociety.donordrive.com/api/1.3/participants/38761/donations";
const tracyPromise = fetch(endpoint2);
const donorList = document.querySelector(".donor-list");

tracyPromise.then(response2 => {
    return response2.json();
}).then(data2 => {
    for (const obj of data2) {

        if (!obj.displayName) {
            obj.displayName = "anonymous"
        }
        if (obj.displayName === "Facebook Donor") {
            donorList.innerHTML += `<ul><a href="/" target="_blank">Facebook Donor</a></ul>`
        }
        if (!obj.amount && obj.displayName != "Facebook Donor") {
            console.log(`${obj.displayName}`)
            donorList.innerHTML += `<ul>${`${obj.displayName}`}</ul>`;
        }
        if (obj.amount && obj.displayName != "Facebook Donor") {
        console.log(`${obj.displayName}: $${obj.amount}`);
        donorList.innerHTML += `<ul>${`${obj.displayName}: $${obj.amount}`}</ul>`;
    }

    };

}).catch(handleError);