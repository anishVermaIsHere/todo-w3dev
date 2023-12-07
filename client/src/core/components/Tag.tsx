import card from '../components/Card.module.css';


const colors=['bg-blue-200','bg-green-200','bg-orange-200','bg-red-200','bg-lime-200','bg-teal-200','bg-indigo-200','bg-pink-200','bg-purple-200','bg-violet-200','bg-gray-200'];
const randomColors=():string=>colors[Math.round(Math.random()*colors.length)];

const Tag = ({tag}) => <span className={`${card.tag} ${randomColors()}`}>{tag}</span>


export default Tag