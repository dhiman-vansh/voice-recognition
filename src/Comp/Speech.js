import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useState } from 'react';

export default function Speech() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const commands = [
        {
            command: ['Teri Maa ki *','Teri Maa ka *'],
            callback: (food) => setMessage(`Teri maa ka ${food} bhenkelode`)
        },
        {
            command: 'The weather is :condition today',
            callback: (condition) => setMessage(`Today, the weather is ${condition}`)
        },
        {
            command: 'My top sports are * and *',
            callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
        },
        {
            command: 'Pass the salt (please)',
            callback: () => setMessage('My pleasure')
        },
        {
            command: ['Hello', 'Hi'],
            callback: () => setMessage(`Hi there! Whats your name ?`),
            matchInterim: true
        },
        {
            command: 'My name is *',
            callback : (fname) => {
                setName(fname)
                console.log(fname)
                setMessage(`Hello Mr. ${fname} `)
            }
        },
        {
            command:'patharbaaz *',
            callback: () => setMessage(`Tu hoga kashmiri madarchod`),
            isFuzzyMatch:true
        },
        {
            command: 'Beijing',
            callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
            // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2
        },
        {
            command: ['chutiya', 'maadarachod', 'madar chod','Gandu'],
            callback: (abuse) => setMessage(`Tu ${abuse} BSDK `),
            isFuzzyMatch:true
        },
        {
            command: ['bhen *', 'bahan *', ],
            callback: (abuse) => setMessage(`Tu ${abuse} BSDK `),
            isFuzzyMatch:true
        },
        
        {
            command: ['laude', 'lode', 'lore','lourde'],
            callback: (abuse) => setMessage(`Tu ${abuse} bhen ke lode `),
            isFuzzyMatch:true
        },
        
        {
            command: ['chuchi', 'chutad','chuttar'],
            callback: (abuse) => setMessage(`Teri ${abuse} madarchod`),
            isFuzzyMatch:true
        },
        {
            command: ['computer'],
            callback:({resetTranscript}) => resetTranscript(),
            isFuzzyMatch:true
        },
        // {
        //     command: 'stop',
        //     callback: ()=> stopListening
        // }
        // {
        //     command:"Teri maa ki *",
        //     callback: (abuse) => setMessage(`Teri Maa ka ${abuse} `),
        //     isFuzzyMatch:true
        // }
        // {
        //   command: ['eat', 'sleep', 'leave'],
        //   callback: (command) => setMessage(`Best matching command: ${command}`),
        //   isFuzzyMatch: true,
        //   fuzzyMatchingThreshold: 0.2,
        //   bestMatchOnly: true
        // },
        // {
        //     command: 'computer',
        //     callback: ({ resetTranscript }) => {
        //         setMessage("Clear command called ");
        //         resetTranscript()
        //     }
        // }
    ]

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <p>{message}</p>

            <button onClick={SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );

}