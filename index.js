//array
let participants = [
    {
        name: "Vinícius Costa",
        email: "vinicius@gmail.com",
        subscriptionDate: new Date(2024, 2, 22, 22, 4),
        CheckInDate: new Date(2024, 2, 25, 10, 0)
    },
    {
        name: "Marcos Costa",
        email: "marcos@gmail.com",
        subscriptionDate: new Date(2024, 2, 19, 21, 4),
        CheckInDate: new Date(2024, 2, 25, 11, 0)
    },
    {
        name: "Ana Silva",
        email: "ana@gmail.com",
        subscriptionDate: new Date(2024, 2, 18, 19, 30),
        CheckInDate: new Date(2024, 2, 26, 9, 15)
    },
    {
        name: "Juliana Santos",
        email: "juliana@gmail.com",
        subscriptionDate: new Date(2024, 2, 20, 14, 20),
        CheckInDate: new Date(2024, 2, 27, 12, 30)
    },
    {
        name: "Pedro Oliveira",
        email: "pedro@gmail.com",
        subscriptionDate: new Date(2024, 2, 23, 18, 45),
        CheckInDate: new Date(2024, 2, 26, 14, 0)
    },
    {
        name: "Mariana Souza",
        email: "mariana@gmail.com",
        subscriptionDate: new Date(2024, 2, 24, 16, 10),
        CheckInDate: new Date(2024, 2, 27, 10, 45)
    },
    {
        name: "Luiz Santos",
        email: "luiz@gmail.com",
        subscriptionDate: new Date(2024, 2, 21, 12, 5),
        CheckInDate: new Date(2024, 2, 28, 8, 20)
    },
    {
        name: "Camila Ferreira",
        email: "camila@gmail.com",
        subscriptionDate: new Date(2024, 2, 17, 17, 0),
        CheckInDate: new Date(2024, 2, 28, 11, 45)
    },
    {
        name: "Rafael Oliveira",
        email: "rafael@gmail.com",
        subscriptionDate: new Date(2024, 2, 25, 9, 30),
        CheckInDate: new Date(2024, 2, 29, 10, 15)
    },
    {
        name: "Aline Silva",
        email: "aline@gmail.com",
        subscriptionDate: new Date(2024, 2, 22, 13, 55),
        CheckInDate: new Date(2024, 2, 29, 13, 30)
    }
];


function createNewParticipant(participant) {

    const subscriptionDate = dayjs(Date.now())
    .to(participant.subscriptionDate)

    let CheckInDate = dayjs(Date.now())
    .to(participant.CheckInDate)

    if(participant.CheckInDate == null) {
        CheckInDate = `
            <button data-email="${participant.email}"
            onclick="doCheckIn(event)">
                Confirmar Check-In
            </button>
        `
    }

    return `
    <tr>
        <td>
            <strong>
                ${participant.name}
            </strong>
            <br>
            <small>
                ${participant.email}
            </small>
        </td>
        <td>${subscriptionDate}</td>
        <td>${CheckInDate}</td>
    </tr>
    `
}

function updateList(participants) {
    let output = ""
    for(let participant of participants){
        output = output + createNewParticipant(participant)
    }
//substituir informação html
    document.querySelector('tbody').innerHTML = 
    output
}

updateList(participants)

function addParticipant(event) {
    event.preventDefault()
    
    const confirmParticipant = 
    "Tem certeza que deseja realizar a inscrição?"
    if(confirm(confirmParticipant) == false) {
        return
    }

    const formData = new FormData(event.target)

    const participant = {
        name: formData.get('nome'),
        email: formData.get('email'),
        subscriptionDate: new Date(),
        CheckInDate: null
    }

    const participantExist = participants.find(
        (p) => {
            return p.email == participant.email
        }
    )

    if(participantExist) {
        alert("Email já cadastrado!")
        return
    }

    participants = [participant, ...participants]
    updateList(participants)

    event.target.querySelector('[name="nome"]').value=""
    event.target.querySelector('[name="email"]').value=""


}

function doCheckIn(event) {
    const confirmMessage = 
    "Tem certeza que deseja fazer o Check-in?"
    if(confirm(confirmMessage) == false) {
        return
    }
    //encontrar participante dentro da lista
    const participant = participants.find((p) => {
        return p.email == event.target.dataset.email
    })
    participant.CheckInDate = new Date()
    updateList(participants)
}