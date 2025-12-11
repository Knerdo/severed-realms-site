import React from 'react';
import { Scroll, Skull } from 'lucide-react';

const SessionData = [
  {
    id: 2,
    num: 2,
    title: "A Riven Transformation",
    date: "Dec 04, 2025",
    summary:
      "Arathus is dead. The party uncovers a Riven transformation, allies with the Umbral Reavers, enters a pact with House Balor to steal a Black Ledger, and hunts a monstrosity at a local farm.",
    content: (
      <>
        <div className="bg-stone-900/50 p-4 border border-stone-800 rounded mb-6 text-sm font-body text-stone-400 flex flex-wrap justify-between gap-4">
          <div>
            <strong className="text-stone-300">Location:</strong>{" "}
            <span className="text-stone-200">Halvar's Grace</span>
          </div>
          <div>
            <strong className="text-stone-300">Time:</strong> Late Afternoon -
            Following Morning
          </div>
          <div>
            <strong className="text-stone-300">Status:</strong>{" "}
            <span className="text-orange-600">The Plot Thickens</span>
          </div>
        </div>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          I. The Ashes of Arathus
        </h3>
        <p className="mb-4">
          The cultist <strong className="text-orange-500">Arathus Kexor</strong>{" "}
          lay dead. Among his possessions, the party recovered{" "}
          <strong>212 gp</strong>, a jagged{" "}
          <span className="text-emerald-600 italic">Bone Key</span>, and a heavy
          iron sigil belonging to the{" "}
          <span className="text-red-400 font-bold">Umbral Reavers</span>.
        </p>

        <p className="mb-4">
          While the group consolidated their findings,{" "}
          <span className="text-orange-500 font-bold">Maldan Breen</span>{" "}
          discovered a series of glyphs scrawled on the wall. The symbols
          triggered a deep, personal recognition within him. Visibly shaken, he
          apologized to the party, stating he had to pursue this lead
          immediately at the city archives. He promised to rendezvous in two
          days and departed with haste.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Witnesses
        </h4>
        <p className="mb-4">
          <span className="text-orange-500 font-bold">Erevan</span>, utilizing
          his bond with nature, spoke to the only witnesses left alive: two
          goats named <strong>Billy and Billy</strong>. Through their skittish
          bleating, a horrific truth was revealed.
        </p>

        <div className="text-stone-400 italic border-l-2 border-stone-700 pl-4 my-4">
          "The Master spoke the words. The man... he didn't change right.
          Arathus threw him away. But the female... her bones snapped and grew.
          Her fingers became knives. She clawed out her own eyes and peeled the
          skin from her ribs. Arathus told her "Go now child and await the
          Mother's call."
        </div>

        <p className="mb-4">
          To cover their tracks and cleanse the site, the party set the house
          ablaze, informing the gate guards of a "tragic fire" as they returned
          to the city.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          II. Shadows in the Woeful Toad
        </h3>
        <p className="mb-4">
          The party returned to{" "}
          <span className="text-stone-300 font-semibold">The Woeful Toad</span>{" "}
          at dusk.{" "}
          <span className="text-orange-500 font-bold">Tilla Bramblebrew</span>{" "}
          welcomed them warmly, offering{" "}
          <span className="text-orange-500 font-bold">Dazrian Edgecorde</span> a
          drink and a surge of <strong>Inspiration</strong>. Dazrian took the
          stage, weaving illusions of a seductive demoness into his performance,
          holding the crowd in the palm of his hand.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Reaver's Grief
        </h4>
        <p className="mb-4">
          Outside, <span className="text-orange-500 font-bold">Erevan</span> was
          approached by{" "}
          <span className="text-orange-500 font-bold">Thalia Greycut</span>. She
          warned him that his companions were too loud for a city ruled by
          silence. Recognizing the sigil on her belt, Erevan presented the
          bloodied amulet found on Arathus.
        </p>

        <p className="mb-4">
          Thalia was devastated. She confirmed the sigil belonged to{" "}
          <strong>Vane</strong>, a missing agent. Erevan explained Vane's
          fate—sacrificed to become a devil—and the mutation of his partner,{" "}
          <strong>Mira</strong>. Thalia revealed her true allegiance: she
          belonged to the{" "}
          <span className="text-red-400 font-bold">Umbral Reavers</span>, a
          shadow guild dedicated to hunting monstrosities that breached the
          realm from the <strong>Grey Lament</strong>. She begged the party: if
          they find Mira, end her suffering.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          III. The Iron Dowager
        </h3>
        <p className="mb-4">
          Inside,{" "}
          <span className="text-orange-500 font-bold">Titus Granitefist</span>{" "}
          spotted a noblewoman and a younger man watching Dazrian with keen
          interest. Through a loud (and slightly awkward) introduction, the
          party was invited to their booth.
        </p>

        <p className="mb-4">
          The young man, <strong>Corwin Balor</strong>, was merely a mouthpiece.
          The true power was his wife,{" "}
          <span className="text-orange-500 font-bold">Lady Isilde Balor</span>.
          She revealed a wanted poster of{" "}
          <span className="text-orange-500 font-bold">Dazrian</span>, issued by{" "}
          <span className="text-red-400 font-bold">House Thane</span> for the
          murder of <strong>Ser Daven Thane</strong>. She knew Dazrian was the
          bard in question.
        </p>

        <div className="text-stone-400 italic border-l-2 border-stone-700 pl-4 my-4">
          "House Thane took everything from me. My husband, my brother, my
          lands. They are the King's jackals. I want them bled."
        </div>

        <p className="mb-4">
          <strong>The Heist:</strong> Lady Isilde offered the party protection
          at her estate. In exchange, she asked that they raid the{" "}
          <span className="text-stone-300 font-semibold">Thane Warehouse</span>{" "}
          to steal a <strong>Black Ledger</strong> containing proof of the
          House's illegal dealings. The party accepted, seeking refuge from the
          exposed tavern.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          IV. The Horror at the Farm
        </h3>
        <p className="mb-4">
          After a night of rest at the Balor Estate (and a successful romantic
          conquest by <span className="text-orange-500 font-bold">Titus</span>{" "}
          involving Tilla), the party mobilized. Before attempting the heist,
          they decided to tie up the loose end at the farm, suspecting the
          creature eating livestock was the mutated Reaver,{" "}
          <strong>Mira</strong>.
        </p>

        <p className="mb-4">
          At the farm, they met the obstinate farmer{" "}
          <strong>Eddy Ric Voss</strong> and, surprisingly, the goats Billy and
          Billy, who had wandered there.{" "}
          <span className="text-orange-500 font-bold">Erevan</span> befriended a
          sheep that was sad for not being named, naming him{" "}
          <strong>Tav</strong>, the relieved sheep directed them toward the
          woods.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Mercy Kill
        </h4>
        <p className="mb-4">
          Stalking through the rain-soaked forest, the party ambushed the
          creature. <strong>Mira</strong> was a nightmare of weeping flesh and
          elongated limbs—a being <strong>Riven</strong> by the Grey Lament. She
          flew at Erevan, grappling him in a desperate embrace, but the combined
          might of the party ended her misery quickly.{" "}
        </p>

        <p className="mb-4">
          They took the creature's head—proof for the farmer, and closure for
          the Reavers.
        </p>

        {/* LOOT SUMMARY */}
        <div className="bg-stone-900/50 p-6 border border-orange-900/30 rounded-lg mt-8">
          <h3 className="text-lg font-title text-orange-600 mb-4 flex items-center gap-2">
            💰 Session Assets
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-stone-400">
            <li>
              <strong className="text-stone-300">Gold:</strong> 212 gp
            </li>
            <li>
              <strong className="text-stone-300">Key Item:</strong>{" "}
              <span className="text-emerald-600 italic">The Bone Key</span>{" "}
              (Purpose Unknown)
            </li>
            <li>
              <strong className="text-stone-300">Key Item:</strong>{" "}
              <span className="text-emerald-600 italic">
                Umbral Reaver Sigil
              </span>
            </li>
            <li>
              <strong className="text-stone-300">Reward:</strong> Free Room &
              Board at The Woeful Toad (Courtesy of Titus's... performance).
            </li>
            <li>
              <strong className="text-stone-300">Status:</strong> Hiding at{" "}
              <span className="text-stone-300 font-semibold">
                House Balor Estate
              </span>
              .
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 1,
    num: 1,
    title: "Tithes for the Heir",
    date: "Nov 13, 2025",
    summary:
      "The party convened in Halvar's Grace at Execution Square. Following a shared lucid vision, they banded together to investigate the phantom chains beneath the city.",
    content: (
      <>
        <div className="bg-stone-900/50 p-4 border border-stone-800 rounded mb-6 text-sm font-body text-stone-400">
          <strong className="text-stone-300">Location:</strong>{" "}
          <span className="text-stone-200">Halvar's Grace</span>,{" "}
          <span className="text-stone-200">The Woeful Toad</span>,{" "}
          <span className="text-stone-200">Arathus’s Home</span>
        </div>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          1. The Meeting at Execution Square
        </h3>
        <p className="mb-4">
          The party convened in{" "}
          <span className="text-stone-300 font-semibold">Halvar's Grace</span>{" "}
          at Execution Square. Following a shared lucid vision where they saw
          one another amidst the blood and stone, they decided to band together.
          As they departed for{" "}
          <span className="text-stone-300 font-semibold">The Woeful Toad</span>,
          they noticed they were being tailed.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Nervous Watcher
        </h4>
        <p className="mb-4">
          Upon confrontation, the stalker revealed himself to be{" "}
          <span className="text-orange-500 font-bold">Destrian Cornwallis</span>
          , a nervous corpse tender who despises his job but has no family left
          following "The Cleansing." He admitted to following the group because
          he noticed their visceral reaction in the square and knew they also
          heard the phantom chains.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Chute
        </h4>
        <p className="mb-4">
          <span className="text-orange-500 font-bold">Destrian</span> led the
          partyto a refuse chute near the church. He nodded toward it before
          retreating to his duties, fearful of being seen with outsiders.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-stone-400">
          <li>
            <strong className="text-stone-300">Investigation:</strong>{" "}
            <span className="text-orange-500 font-bold">Titus Granitefist</span>{" "}
            cast a spell to detect celestials and confirmed a divine presence
            near the chute where bodies are dumped.
          </li>
          <li>
            <strong className="text-stone-300">The Drop:</strong> Upon opening
            the chute, the group heard audible chains and gagged whimpers.{" "}
            <span className="text-orange-500 font-bold">Maldan Breen</span> cast{" "}
            <em>Light</em> on a copper coin and dropped it. It fell
            approximately 200 feet before the chute curved out of sight beneath
            the church. Finding no other external clues, the group proceeded to
            the tavern.
          </li>
        </ul>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          2. The Woeful Toad
        </h3>
        <p className="mb-4">
          At the tavern, the party sought rest and information.{" "}
          <span className="text-orange-500 font-bold">Titus</span> spoke with
          the proprietor,{" "}
          <span className="text-orange-500 font-bold">Tilla Bramblebrew</span>.
        </p>

        <ul className="list-disc pl-5 space-y-2 mb-4 text-stone-400">
          <li>
            <strong className="text-stone-300">Social Encounter:</strong>{" "}
            <span className="text-orange-500 font-bold">Titus</span> used his
            persuasion skills effectively.{" "}
            <span className="text-orange-500 font-bold">Tilla</span> became
            quite fond of him and gifted him a bottle of "unsold" whiskey.{" "}
            <br />
            <span className="text-emerald-600 italic">
              Item Acquired: Old Whiskey (+4 Temporary HP).
            </span>
          </li>
          <li>
            <strong className="text-stone-300">Scouting:</strong> Meanwhile,{" "}
            <span className="text-orange-500 font-bold">Erevan</span>
            —maintaining his cautious ranger nature—scouted the perimeter. Once
            deemed safe, he joined the group inside.
          </li>
          <li>
            <strong className="text-stone-300">The Performance:</strong>{" "}
            <span className="text-orange-500 font-bold">Dazrian Edgecorde</span>{" "}
            decided to grace the crowd with a song. It impressed{" "}
            <span className="text-orange-500 font-bold">Tilla</span> so much
            that she asked him to come back and play that night as they were
            expecting a crowd, offering room and board in exchange.
          </li>
        </ul>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          3. Clues from Ruphus Kess
        </h3>
        <p className="mb-4">
          While <span className="text-orange-500 font-bold">Maldan Breen</span>{" "}
          settled in a corner with an ale, he noticed a patron,{" "}
          <span className="text-orange-500 font-bold">Ruphus Kess</span>,
          reacting viscerally to something Titus said at the bar.
        </p>

        <p className="mb-4">
          <span className="text-orange-500 font-bold">Maldan</span> approached{" "}
          <span className="text-orange-500 font-bold">Ruphus</span> and
          successfully cast <em>Charm Person</em>.
        </p>

        <p className="mb-4">
          <strong className="text-stone-300">Intel:</strong>{" "}
          <span className="text-orange-500 font-bold">Ruphus</span> opened up
          about his PTSD and past dealings. Once a commander of the 5th Penitent
          Legion, unable to commit atrocities he was forcefully removed from his
          position. Now, a shell of himself and a drunk he revealed that{" "}
          <span className="text-orange-500 font-bold">Arathus Kexor</span>, a
          priest at the church, once tried to coerce him into a tunnel beneath
          the church. <span className="text-orange-500 font-bold">Ruphus</span>{" "}
          had refused, as he wanted nothing to do with the strange priest.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          4. The Investigation of Arathus
        </h3>
        <p className="mb-4">
          Armed with this new link, the party returned to the church to track
          down the priest.
        </p>
        <p className="mb-4">
          They met{" "}
          <span className="text-orange-500 font-bold">Brother Jareth</span>, who
          informed them that{" "}
          <span className="text-orange-500 font-bold">Arathus</span> has been
          missing for some time. Previous church investigations yielded nothing.{" "}
          <span className="text-orange-500 font-bold">Jareth</span> provided
          directions to{" "}
          <span className="text-orange-500 font-bold">Arathus's</span> dwelling:
          outside of town, up the low roads on the left.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          5. Arathus's House & The Cult
        </h3>
        <p className="mb-4">
          The group located the house, which was in surprisingly good condition
          for belonging to a missing person.
        </p>

        <ul className="list-disc pl-5 space-y-2 mb-4 text-stone-400">
          <li>
            <strong className="text-stone-300">The Illusion:</strong> After
            knocking, the door creaked open. The group detected magic in the
            area, revealing an illusion covering the floor. Behind it, they
            found a stairway carved into the ground leading to a dark hallway.
          </li>
          <li>
            <strong className="text-stone-300">The Ambush:</strong>{" "}
            <span className="text-orange-500 font-bold">Erevan</span> sneaked
            down to investigate and heard murmurs and chanting.
          </li>
          <li>
            <strong className="text-stone-300">Combat:</strong> A noise
            triggered an attack.{" "}
            <span className="text-orange-500 font-bold">Arathus</span> summoned
            a <strong>Spined Devil</strong> from the body of one of the
            cultists, initiating a desperate fight.
          </li>
        </ul>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          6. Aftermath
        </h3>
        <p className="mb-4">
          The party successfully dismantled the cultist group and killed{" "}
          <span className="text-orange-500 font-bold">Arathus</span>.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-stone-400">
          <li>
            <strong className="text-stone-300">Final Words:</strong>{" "}
            <span className="text-orange-500 font-bold">Arathus's</span> dying
            words were:{" "}
            <em className="text-stone-200">"It's all for the heir."</em>
          </li>
          <li>
            <strong className="text-stone-300">Loot:</strong> The group received
            212gp, Sigil, and a mysterious{" "}
            <span className="text-emerald-600 italic">Bone Key</span>.
          </li>
        </ul>
      </>
    ),
  },
];

export default SessionData;