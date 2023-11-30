const formMessage = document.querySelector('form')

formMessage?.addEventListener('submit', async event => {
    event.preventDefault()

    // @ts-ignore
    const formDataEncoded = new URLSearchParams(new FormData(formMessage))

    try {
        const res = await fetch(
            '/api/messages',
            {
                method: 'POST',
                body: formDataEncoded,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            },
        )

    } catch (err) {
        console.log(err.message)
    }
})