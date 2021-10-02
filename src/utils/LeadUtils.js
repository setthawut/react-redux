export function mapCreateLeadFormToApiRequest(value) {
    var mobiles = !!value.mobile ? value.mobile.split(',') : []
    var emails = !!value.email ? value.email.split(',') : []

    var apiRequest = {
        "Mobiles": mobiles,
        "Emails": emails,
        "Status": value.consentAgree == "agree",
        "Source": value.source,
        "Note": ``
    }
    return apiRequest
}

export function mapCheckingConsentLeadFormToApiRequest(lead, value) {
    var apiRequest = {
        "Lead": lead,
        "System": value.system,
        "Note": ""
    }
    return apiRequest
}