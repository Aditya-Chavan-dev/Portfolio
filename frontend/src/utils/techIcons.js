/**
 * Centralized utility for tech stack icons.
 * Prevents duplication between ProjectsView and ProjectTemplate.
 */
export const getTechIcon = (language) => {
    if (!language) return null;

    // Special cases
    if (language === 'TanStack Query') return 'https://raw.githubusercontent.com/TanStack/query/main/media/logo.svg';

    const map = {
        'JavaScript': 'javascript/javascript-original',
        'TypeScript': 'typescript/typescript-original',
        'Python': 'python/python-original',
        'Java': 'java/java-original',
        'C#': 'csharp/csharp-original',
        'C++': 'cplusplus/cplusplus-original',
        'HTML': 'html5/html5-original',
        'CSS': 'css3/css3-original',
        'Vue': 'vuejs/vuejs-original',
        'React': 'react/react-original',
        'Dart': 'dart/dart-original',
        'Go': 'go/go-original-wordmark',
        'Shell': 'bash/bash-original',
        'Files': 'file-icons/file-icons-original',
        'Node.js': 'nodejs/nodejs-original',
        'Express': 'express/express-original',
        'Redis': 'redis/redis-original',
        'Postgres': 'postgresql/postgresql-original',
        'Firebase': 'firebase/firebase-plain',
        'Google Cloud': 'googlecloud/googlecloud-original',
        'Vite': 'vitejs/vitejs-original',
        'Tailwind': 'tailwindcss/tailwindcss-original',
        'Sass': 'sass/sass-original',
        'Less': 'less/less-plain-wordmark',
        'Redux': 'redux/redux-original',
        'Git': 'git/git-original',
        'Docker': 'docker/docker-original',
        'Kubernetes': 'kubernetes/kubernetes-plain',
        'AWS': 'amazonwebservices/amazonwebservices-original-wordmark',
        'Azure': 'azure/azure-original',
        'Nginx': 'nginx/nginx-original',
        'Linux': 'linux/linux-original',
    };

    // Find key matching the language string (e.g. "React.js" matches "React")
    const key = Object.keys(map).find(k => language.includes(k));
    const slug = key ? map[key] : null;

    if (!slug) return null;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`;
};
