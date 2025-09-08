<script>
    import favicon from '$lib/assets/favicon.png';
    import { enhance } from '$app/forms';
    
    let { data } = $props();
    let showForm = $state(false);
    let isSubmitting = $state(false);
    let submitMessage = $state('');
    let formData = $state({
        name: '',
        creator: '',
        description: '',
        image: '',
        github: '',
        demo: ''
    });

    function openForm() {
        showForm = true;
        document.body.style.overflow = 'hidden';
    }

    function closeForm() {
        showForm = false;
        document.body.style.overflow = 'auto';
        formData = {
            name: '',
            creator: '',
            description: '',
            image: '',
            github: '',
            demo: ''
        };
        submitMessage = '';
    }

    const enhanceSubmit = () => {
        return enhance(async ({ formData, cancel }) => {
            isSubmitting = true;
            submitMessage = '';
            
            return async ({ result }) => {
                isSubmitting = false;
                
                if (result.type === 'success') {
                    submitMessage = 'Userscript submitted successfully! It will appear after review.';
                    setTimeout(() => {
                        closeForm();
                        window.location.reload();
                    }, 2000);
                } else if (result.type === 'failure') {
                    submitMessage = result.data?.error || 'Error submitting userscript. Please try again.';
                } else {
                    submitMessage = 'Error submitting userscript. Please try again.';
                }
            };
        });
    };
</script>

<div class="container">
    <div class="header">
        <div class="header-content">
            <img src="{favicon}" alt="Logo" class="logo" />
            <div class="header-text">
                <h1 class="title">HC Userscripts</h1>
                <p class="subtitle">A collection of Hack Clubber-made userscripts.</p>
            </div>
        </div>
        
        <button class="submit-btn" onclick={openForm}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Submit Userscript
        </button>
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
        {/each}
    </div>
</div>

<!-- Modal Overlay -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if showForm}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-overlay" onclick={closeForm}>
        <div class="modal-content" onclick={(e) => e.stopPropagation()}>
            <div class="modal-header">
                <h2 class="modal-title">Submit Your Userscript</h2>
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button class="close-btn" onclick={closeForm}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
            
            <form method="POST" action="?/submit" class="form" use:enhanceSubmit>
                <div class="form-group">
                    <label for="name" class="form-label">Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        class="form-input" 
                        placeholder="My Awesome Userscript"
                        bind:value={formData.name}
                        required
                    />
                </div>
                
                <div class="form-group">
                    <label for="creator" class="form-label">Creator *</label>
                    <input 
                        type="text" 
                        id="creator" 
                        name="creator"
                        class="form-input" 
                        placeholder="Your name or username"
                        bind:value={formData.creator}
                        required
                    />
                </div>
                
                <div class="form-group">
                    <label for="description" class="form-label">Description *</label>
                    <textarea 
                        id="description" 
                        name="description"
                        class="form-textarea" 
                        placeholder="A brief description of what your userscript does..."
                        bind:value={formData.description}
                        rows="3"
                        required
                    ></textarea>
                </div>
                
                <div class="form-group">
                    <label for="github" class="form-label">GitHub URL *</label>
                    <input 
                        type="url" 
                        id="github" 
                        name="github"
                        class="form-input" 
                        placeholder="https://github.com/username/repo"
                        bind:value={formData.github}
                        required
                    />
                </div>
                
                <div class="form-group">
                    <label for="demo" class="form-label">Demo URL</label>
                    <input 
                        type="url" 
                        id="demo" 
                        name="demo"
                        class="form-input" 
                        placeholder="https://example.com/demo"
                        bind:value={formData.demo}
                    />
                </div>
                
                <div class="form-group">
                    <label for="image" class="form-label">Image URL</label>
                    <input 
                        type="url" 
                        id="image" 
                        name="image"
                        class="form-input" 
                        placeholder="https://example.com/screenshot.png"
                        bind:value={formData.image}
                    />
                </div>
                
                {#if submitMessage}
                    <div class="submit-message" class:error={submitMessage.includes('Error')}>
                        {submitMessage}
                    </div>
                {/if}
                
                <div class="form-actions">
                    <button type="button" class="cancel-btn" onclick={closeForm} disabled={isSubmitting}>
                        Cancel
                    </button>
                    <button type="submit" class="submit-form-btn" disabled={isSubmitting}>
                        {#if isSubmitting}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="spinner">
                                <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"/>
                            </svg>
                            Submitting...
                        {:else}
                            Submit Userscript
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}

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
        position: relative;
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

    .submit-btn {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
    }

    .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 12px -2px rgba(59, 130, 246, 0.3);
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
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
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid #27272a;
    }

    .creator-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .creator-label {
        font-size: 0.75rem;
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

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 1rem;
    }

    .modal-content {
        background: linear-gradient(145deg, #111111 0%, #1a1a1a 100%);
        border: 1px solid #27272a;
        border-radius: 16px;
        width: 100%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem 1.5rem 0 1.5rem;
    }

    .modal-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        color: #fafafa;
    }

    .close-btn {
        background: none;
        border: none;
        color: #71717a;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fafafa;
    }

    .form {
        padding: 1.5rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: #d4d4d8;
        margin-bottom: 0.5rem;
    }

    .form-input,
    .form-textarea {
        width: 100%;
        padding: 0.75rem;
        background: #18181b;
        border: 1px solid #27272a;
        border-radius: 8px;
        color: #fafafa;
        font-size: 0.875rem;
        transition: all 0.2s ease;
        box-sizing: border-box;
    }

    .form-input:focus,
    .form-textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-textarea {
        resize: vertical;
        min-height: 80px;
    }

    .form-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        margin-top: 2rem;
    }

    .cancel-btn {
        padding: 0.75rem 1rem;
        background: transparent;
        border: 1px solid #27272a;
        border-radius: 8px;
        color: #a1a1aa;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .cancel-btn:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.05);
        border-color: #404040;
        color: #fafafa;
    }

    .submit-form-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 140px;
        justify-content: center;
    }

    .submit-form-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        transform: translateY(-1px);
    }

    .submit-form-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .submit-message {
        padding: 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
        margin-bottom: 1rem;
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.2);
        color: #4ade80;
    }

    .submit-message.error {
        background: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.2);
        color: #f87171;
    }

    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        .header {
            padding-bottom: 1rem;
        }

        .header-content {
            flex-direction: column;
            gap: 1rem;
        }

        .submit-btn {
            position: static;
            margin-top: 1rem;
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

        .action-buttons {
            flex-direction: column;
        }

        .demo-link,
        .github-link {
            justify-content: center;
        }

        .modal-content {
            margin: 0.5rem;
            max-height: 95vh;
        }

        .form-actions {
            flex-direction: column;
        }
    }
</style>