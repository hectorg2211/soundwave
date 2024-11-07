# Soundwave 🎵

Soundwave is a modern, full-stack music streaming platform built with Next.js, React, and Supabase. It offers a sleek user interface for discovering and playing music, with features like user authentication, playlist creation, and premium subscriptions.

![Soundwave Screenshot](path_to_screenshot.png)

## 🚀 Features

- User authentication with Supabase Auth
- Music playback with custom audio player
- Create and manage playlists
- Search functionality for songs and artists
- Responsive design for desktop and mobile
- Premium subscription management with Stripe integration
- Real-time updates using Supabase's real-time capabilities

## 🛠️ Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Payment Processing**: Stripe
- **Deployment**: Vercel

## 🏗️ Project Structure

- `app/`: Next.js app router and page components
- `components/`: Reusable React components
- `hooks/`: Custom React hooks
- `libs/`: Utility functions and configurations
- `providers/`: React context providers
- `public/`: Static assets
- `types/`: TypeScript type definitions

## 🚀 Getting Started

1. Clone the repository:
   git clone https://github.com/yourusername/soundwave.git

2. Install dependencies:
   cd soundwave
   npm install

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase and Stripe credentials:
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key

4. Run the development server:
   npm run dev

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/soundwave/issues).

## 👨‍💻 Author

Your Name

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Supabase](https://supabase.io/) for the amazing backend-as-a-service
- [Next.js](https://nextjs.org/) for the powerful React framework
- [Vercel](https://vercel.com/) for hosting and deployment

---

Give a ⭐️ if you like this project!
