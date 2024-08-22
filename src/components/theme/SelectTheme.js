import useLocalstorage from '../../hooks/localstorage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function SelectTheme() {
    const themes = {
        LIGHT: 'light',
        DARK: 'dark'
    };

    const [theme, setTheme] = useLocalstorage('theme', (window.matchMedia?.('(prefers-color-scheme: dark)').matches && themes.DARK) || themes.LIGHT);
    document.getElementsByTagName('body')[0].setAttribute('data-theme', theme);

    const toggleTheme = () => {
        setTheme(theme === themes.LIGHT ? themes.DARK : themes.LIGHT);
    }

    return (
        <div className="theme" onClick={toggleTheme}>
            <FontAwesomeIcon className="icon-theme" icon={theme === themes.LIGHT ? faMoon : faSun} />
        </div>
    );
}