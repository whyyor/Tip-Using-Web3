const web3 = new Web3(Web3.givenProvider)

const form = document.querySelector('form')

const send = async function (amount) {
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
    })
    const wei = web3.utils.toWei(amount, 'ether') //we convert ether to wei as wei is passed in send transaction
    if (accounts.length > 0) { //checking if we have an account connected
        window.ethereum.request({
            method: 'eth_sendTransaction', //using method given on ehtereum docs
            params: [{ //using other bits of information requried to send transaction
                from: accounts[0],
                to: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
                value: web3.utils.toHex(wei) //we convert wei to hex value because wei's hex value is passed in value
            }]
        })
    }
}

if (window.ethereum !== 'undefined') {
    form.classList.add('has-eth')
}

form.addEventListener('submit', function (event) {
    event.preventDefault() //it will stop the submit button to act normally and send the user to another page
    if (window.ethereum) {
        const input = form.querySelector('input')
        send(input.value)
    } else {
        alert('Please install a wallet')
    }
})