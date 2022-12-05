export default function About({ onHomeClick, onStartClick }) {
    return (
        <div className="AboutPage">
            <div className="pochitaWorld">
                <div className="company">
                    <div className="logo"/>
                    <h1 className="gameName">Pochita World</h1>
                </div>
                <nav>
                    <a onClick={onHomeClick}>Home</a>
                    <a onClick={onStartClick}>Back to Game</a>
                    <a href="https://account.venmo.com/u/Gabriel-Amaral-4">Donate</a>
                </nav>
            </div>
            <div className="story">
                <h2>About Us</h2>
                <h4>-------- Game Story --------</h4>
                <p>This game was created with the main character as Pochita. Pochita is a little dog that is a Chainsaw Devil from the anime Chainsaw man, he has a chainsaw coming out of his head and was used by the main character on the anime, Denji, to defeat other devils. In my opinion, Pochita died too soon on the anime from how cute he is, so I deticated this game to him so his life can be always apprecitated through this. Bellow you can read the Synopsis of the anime to know a little more what it is about, and how I got the inspiration for making the game.</p>
                <h4>-------- Anime Story --------</h4>
                <p>Denji is robbed of a normal teenage life, left with nothing but his deadbeat father's overwhelming debt. His only companion is his pet, the chainsaw devil Pochita, with whom he slays devils for money that inevitably ends up in the yakuza's pockets. All Denji can do is dream of a good, simple life: one with delicious food and a beautiful girlfriend by his side. But an act of greedy betrayal by the yakuza leads to Denji's brutal, untimely death, crushing all hope of him ever achieving happiness.</p>
                <p>Remarkably, an old contract allows Pochita to merge with the deceased Denji and bestow devil powers on him, changing him into a hybrid able to transform his body parts into chainsaws. Because Denji's new abilities pose a significant risk to society, the Public Safety Bureau's elite devil hunter Makima takes him in, letting him live as long as he obeys her command. Guided by the promise of a content life alongside an attractive woman, Denji devotes everything and fights with all his might to make his naive dreams a reality.</p>
            </div>

        </div>
    )
}