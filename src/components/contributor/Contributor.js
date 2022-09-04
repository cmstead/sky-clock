export default function Contributor({ data }) {
    const { name, url } = data;

    return (
        <li>
            <a href={url}>{name}</a>
        </li>
    );
}