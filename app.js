/* insert the calendar widget */
// get the entry content div
const entryContent = document.getElementsByClassName('entry-content')[0];	// there's only ever one entry-content
// create a div to hold the calendar widget
const calendarContainer = document.createElement('div');
calendarContainer.setAttribute('id', 'archive-retrieval-calendar-container');
const calendarTitle = document.createElement('h5');
calendarTitle.textContent = "Select the date of the issue (Thursdays only):";
calendarContainer.appendChild(calendarTitle);
// get today's date
const today = new Date();
const todayStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
// append the calendar with today's date as the value
const calendar = document.createElement('jsuites-calendar');
calendarContainer.appendChild(calendar);
// append the calendar widget to entry content
entryContent.appendChild(calendarContainer);
// create an element to hold the potential error message or link
const messageElem = document.createElement('div');
messageElem.setAttribute('id', 'archive-retrieval-message-container');
// append the element to entry content
calendarContainer.appendChild(messageElem);

/* handle date picking */
calendar.addEventListener('onchange', (e) => {
	messageElem.innerHTML = '';	// clear the message
	// get the input value and convert it to a date object
	const datePicked = new Date(e.target.value);
	/* handle incorrect dates */
	let message = '';
	const datePickedMS = datePicked.getTime();
	const todayMS = today.getTime();
	// non-thursday case (days are indexed 0-6, thursday is day 4)
	if (datePicked.getDay()!==4) message = 'Please choose a Thursday (our publication day since 1880!).';
	// future case
	else if (datePickedMS > todayMS) message = 'Sorry, that issue has not yet been produced.';
	// issue unavailable case - 30 days ago is 86400000 milliseconds * 30
	else if (datePickedMS > (todayMS - 86400000*30)) message = 'Sorry, that issue has not yet been moved to the archives.';
	
	// if there is an error, print the message and don't do anything else.
	if (message) messageElem.innerHTML = `<p>${message}</p>`;

	// otherwise, generate the link
	else {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		/* generate the first part of the url, which is the same for both cases */
		// add leading 0s to date and month
		const date = datePicked.getDate();
		const day = date < 10 ? `0${date}` : `${date}`;
		const monthInd = datePicked.getMonth()+1;
		const month = monthInd < 10 ? `0${monthInd}` : `${monthInd}`;
		let monthStr = months[monthInd-1];
		const fullYear = `${datePicked.getFullYear()}`;
		// august 2015 is listed as 'Aug'
		if (fullYear==='2015' && monthInd===8) monthStr = 'Aug';
		// declare the link variable
		let link = `https://ysnews.com/thearchives/${fullYear}/${month}_${monthStr}/`;

		/* append the date-specific part */
		// pre-march 5, 2020 case
		const dividerDate = new Date(2020, 5, 3);
		if (datePickedMS < dividerDate.getTime()) {
			link += `YSN_${month}${day}${fullYear.substr(2,2)}_E.pdf`;
		}
		// march 5, 2020 or later case
		else {
			link += `${datePicked.getFullYear()}${month}${day}`;		
		}

		// print the link
		messageElem.innerHTML = `<a href=${link} target="_blank">View the ${months[monthInd-1]} ${day}, ${fullYear} Issue</a>`;
	}
});