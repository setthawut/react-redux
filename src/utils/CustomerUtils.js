import { toBase64 } from './FileUtils'

export async function mapCreateCustomerFormToApiRequest(value) {
    var apiRequest = {
        "CId": value.customerId,
        "Mobiles": [],
        "Emails": [],
        "ConsentType": value.consentType,
        "Version": value.consentVersion,
        "Status": value.consentAgree == "agree",
        "System": value.system,
        "Note": ``
    }

    if (!!value.file) {
        apiRequest.File = {
            "Name": value.file.name,
            "Data": (await toBase64(value.file)).split('data:text/csv;base64,')[1]
        }
    }

    if (!!value.fileUrl) {
        apiRequest.FileUrl = value.fileUrl
    }
    
    return apiRequest
}