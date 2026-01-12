# Akhil Gupta - Portfolio Website

A professional portfolio website showcasing my experience as a Cloud Solution Architect.

**Live Site:** [https://portfolio-akhilgupta91.vercel.app](https://portfolio-akhilgupta91.vercel.app) *(update with your actual Vercel URL)*

---

## What's In This Project?

This is a simple, single-page portfolio website built with:

- **HTML** - The structure of the website (like the skeleton)
- **CSS** - The styling (colors, fonts, layout)
- **JavaScript** - Small interactive features (smooth scrolling, mobile menu)

No frameworks, no complicated build tools - just the basics!

---

## Project Structure

```
portfolio/
├── index.html              # The main (and only) webpage
├── css/
│   └── styles.css          # All the styling rules
├── js/
│   └── main.js             # Interactive features
├── assets/
│   └── images/
│       └── profile.jpg     # Your profile photo
├── .gitignore              # Files Git should ignore
└── README.md               # This file!
```

---

## How to View the Website Locally

### Option 1: Just Open the File (Easiest)
1. Find the `index.html` file in Finder
2. Double-click it - it will open in your browser!

### Option 2: Using Terminal
```bash
# Navigate to the project folder
cd /Users/akhil/profile

# Open in browser
open index.html
```

### Option 3: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically and refreshes when you make changes!

---

## How to Make Changes

### Changing Your Information

**To update text content:**
1. Open `index.html` in any text editor (VS Code, Sublime, etc.)
2. Find the text you want to change
3. Edit it and save the file
4. Refresh your browser to see changes

**Common things you might want to edit:**

| What to Change | Where to Find It |
|----------------|------------------|
| Your name | Search for "Akhil Gupta" in `index.html` |
| Job title | Look for `<h2>Cloud Solution Architect</h2>` |
| About section | Find `<section id="about">` |
| Work experience | Find `<section id="experience">` |
| Skills | Find `<section id="skills">` |
| Contact email | Search for your email address |

### Changing Colors/Fonts

Open `css/styles.css` and look at the top for these variables:

```css
:root {
    --color-primary: #2563eb;      /* Main blue color */
    --color-text: #1f2937;          /* Text color */
    --color-bg: #ffffff;            /* Background color */
}
```

Change the hex codes to different colors. Use [Google Color Picker](https://g.co/kgs/QZ4V4H) to find color codes!

### Changing Your Photo

1. Replace `assets/images/profile.jpg` with your new photo
2. Make sure the new photo is also named `profile.jpg`
3. Or update the filename in `index.html` (search for `profile.jpg`)

---

## How to Push Updates to GitHub

After making changes, push them to GitHub so Vercel deploys the updates:

```bash
# 1. Navigate to your project (if not already there)
cd /Users/akhil/profile

# 2. Check what files changed
git status

# 3. Add all changes
git add .

# 4. Commit with a message describing what you changed
git commit -m "Updated work experience section"

# 5. Push to GitHub
git push
```

**That's it!** Vercel will automatically detect the changes and redeploy your site in about 30 seconds.

---

## How Vercel Deployment Works

1. Your code lives on GitHub
2. Vercel watches your GitHub repository
3. When you push changes, Vercel automatically rebuilds your site
4. Your live site updates within ~30 seconds

**To check deployment status:**
- Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- Click on your project
- See deployment history and any errors

---

## Troubleshooting

### "I made changes but the live site didn't update"

1. Did you push to GitHub? Run `git push`
2. Check Vercel dashboard for deployment errors
3. Hard refresh your browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)

### "My photo isn't showing"

1. Check if the file exists: `ls assets/images/`
2. Make sure it's named exactly `profile.jpg`
3. Check file permissions: `chmod 644 assets/images/profile.jpg`

### "The website looks broken on mobile"

The site is responsive and should work on mobile. Try:
1. Hard refresh the page
2. Clear browser cache
3. Check if you accidentally deleted CSS code

### "Git says 'nothing to commit'"

Your changes are already committed! Just run `git push` to send them to GitHub.

### "Git push failed"

```bash
# Try pulling first (in case remote has changes)
git pull origin main

# Then push again
git push
```

---

## Adding a Custom Domain (Optional)

Want `www.akhilgupta.com` instead of `portfolio-xyz.vercel.app`?

1. Buy a domain from [Namecheap](https://namecheap.com), [Google Domains](https://domains.google), or [GoDaddy](https://godaddy.com)
2. In Vercel dashboard, go to your project → Settings → Domains
3. Add your custom domain
4. Follow Vercel's instructions to update your domain's DNS settings
5. Wait 24-48 hours for DNS to propagate

---

## Useful Commands Reference

```bash
# Check current status
git status

# See what changes you made
git diff

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest from GitHub
git pull

# See commit history
git log --oneline
```

---

## Want to Learn More?

- **HTML/CSS Basics:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn)
- **Git Tutorial:** [GitHub's Git Guide](https://github.com/git-guides)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)

---

## Contact

- **Email:** akhil1212000@hotmail.com
- **LinkedIn:** [linkedin.com/in/akhil-g-0182a1146](https://www.linkedin.com/in/akhil-g-0182a1146)

---

Built with HTML, CSS, and JavaScript. Deployed on Vercel.
