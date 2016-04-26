function save_options() {
	var APIKey = document.getElementById("apikey").value;
	var desktopNotifications = document.getElementById("desktopNotifications").checked;
	var includeSubmissions = document.getElementById("includeSubmissions").checked;
	var includeJournals = document.getElementById("includeJournals").checked;
	var includeUnreadNotes = document.getElementById("includeUnreadNotes").checked;
	var includeStreamNotifications = document.getElementById("includeStreamNotifications").checked;
	var includeComments = document.getElementById("includeComments").checked;

	var status = document.getElementById("status");

	status.textContent = "Saving options...";

	chrome.storage.sync.set({
		APIKey: APIKey,
		desktopNotifications: desktopNotifications,
		includeSubmissions: includeSubmissions,
		includeJournals: includeJournals,
		includeUnreadNotes: includeUnreadNotes,
		includeStreamNotifications: includeStreamNotifications,
		includeComments: includeComments
	}, function () {

		status.textContent = "Options saved.";
		setTimeout(function () {
			status.textContent = "";
		}, 750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		APIKey: "Paste API key here",
		desktopNotifications: false,
		includeSubmissions: true,
		includeJournals: false,
		includeUnreadNotes: false,
		includeStreamNotifications: false,
		includeComments: false
	}, function (items) {
		if (items.APIKey)
			document.getElementById("apikey").value = items.APIKey;
		else
			document.getElementById("apikey").value = "Paste API key here";
		document.getElementById("desktopNotifications").checked = items.desktopNotifications;
		document.getElementById("includeSubmissions").checked = items.includeSubmissions;
		document.getElementById("includeJournals").checked = items.includeJournals;
		document.getElementById("includeUnreadNotes").checked = items.includeUnreadNotes;
		document.getElementById("includeStreamNotifications").checked = items.includeStreamNotifications;
		document.getElementById("includeComments").checked = items.includeComments;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);