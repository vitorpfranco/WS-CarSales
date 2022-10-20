import styles from './Header.module.scss'

export default function Header() {
    return (
        <header className={styles}>
            <img src="logows.svg"></img>
            <h2>Car Sales</h2>
        </header>)
}