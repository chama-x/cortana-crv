import './globals.css';

export const metadata = {
  title: 'Cortana CRV',
  description: 'Anomalous Cognition Research - Forced Choice Protocol',
  themeColor: '#121212',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
