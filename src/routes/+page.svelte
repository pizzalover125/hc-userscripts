<script>
    import favicon from '$lib/assets/favicon.png';
    let { data } = $props(); 
</script>

<div class="container">
    <div class="header">
        <div class="header-content">
            <img src="{favicon}" alt="Logo" class="logo" />
            <div class="header-text">
                <h1 class="title">Gallery</h1>
                <p class="subtitle">A collection of Hack Clubber-made userscripts.</p>
            </div>
        </div>
    </div>
    
    <div class="grid">
        {#each data.projects as project}
            <div class="card">
                <div class="image-container">
                    <img src="{project.image}" alt="{project.name}" class="project-image" />
                </div>
                
                <div class="content">
                    <h3 class="project-name">{project.name}</h3>
                    <p class="project-description">{project.description}</p>
                    <div class="creator">
                        <div class="creator-info">
                            <span class="creator-label">Created by</span>
                            <span class="creator-name">{project.creator}</span>
                        </div>
                        <div class="action-buttons">
                            {#if project.demo}
                                <a href="{project.demo}" target="_blank" class="demo-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    View Demo
                                </a>
                            {/if}
                            <a href="{project.github}" target="_blank" class="github-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                View Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: #0a0a0a;
        color: #fafafa;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        line-height: 1.6;
    }

    .container {
        min-height: 100vh;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .header {
        text-align: center;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #27272a;
    }

    .header-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
    }

    .logo {
        width: 48px;
        height: 48px;
        flex-shrink: 0;
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
    }

    .header-text {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title {
        font-size: 3rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        background: linear-gradient(135deg, #fafafa 0%, #a1a1aa 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .subtitle {
        font-size: 1.125rem;
        color: #a1a1aa;
        margin: 0;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
    }

    .card {
        background: linear-gradient(145deg, #111111 0%, #1a1a1a 100%);
        border: 1px solid #27272a;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
    }

    .card:hover {
        transform: translateY(-4px);
        border-color: #404040;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 
                    0 10px 10px -5px rgba(0, 0, 0, 0.3);
    }

    .image-container {
        position: relative;
        height: 200px;
        overflow: hidden;
    }

    .project-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .card:hover .project-image {
        transform: scale(1.05);
    }

    .content {
        padding: 1.5rem;
    }

    .project-name {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 0.75rem 0;
        color: #fafafa;
    }

    .project-description {
        font-size: 0.95rem;
        color: #a1a1aa;
        margin: 0 0 1rem 0;
        line-height: 1.5;
    }

    .creator {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #27272a;
    }

    .creator-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .creator-label {
        font-size: 0.875rem;
        color: #71717a;
    }

    .creator-name {
        font-size: 0.875rem;
        font-weight: 500;
        color: #d4d4d8;
        padding: 0.25rem 0.5rem;
        background: #18181b;
        border: 1px solid #27272a;
        border-radius: 4px;
    }

    .action-buttons {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .demo-link {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.75rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        color: #fafafa;
        text-decoration: none;
        font-size: 0.8rem;
        font-weight: 500;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .demo-link:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
    }

    .github-link {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.75rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        color: #fafafa;
        text-decoration: none;
        font-size: 0.8rem;
        font-weight: 500;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .github-link:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        .header-content {
            flex-direction: column;
            gap: 1rem;
        }

        .logo {
            width: 40px;
            height: 40px;
        }

        .title {
            font-size: 2rem;
        }

        .grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .card {
            margin: 0;
        }

        .creator {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .action-buttons {
            align-self: stretch;
            flex-direction: column;
        }

        .demo-link,
        .github-link {
            justify-content: center;
        }
    }
</style>