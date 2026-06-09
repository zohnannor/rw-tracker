import { useState } from 'react';

import { invoke } from '@tauri-apps/api/core';

const App = () => {
    const [greetMessage, setGreetMessage] = useState('');
    const [name, setName] = useState('');

    const greet = async () => setGreetMessage(await invoke('greet', { name }));

    return (
        <main className='container'>
            <h1>Welcome</h1>

            <form
                className='row'
                onSubmit={ev => {
                    ev.preventDefault();
                    greet().catch((err: unknown) => {
                        console.error(err);
                    });
                }}
            >
                <input
                    id='greet-input'
                    onChange={ev => setName(ev.currentTarget.value)}
                    placeholder='Enter a name...'
                />
                <button type='submit'>Greet</button>
            </form>
            <p>{greetMessage}</p>
        </main>
    );
};

export default App;
