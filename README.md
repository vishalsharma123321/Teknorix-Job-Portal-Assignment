# Teknorix Jobs Portal

A React-based job portal application that displays active job openings with search and filter functionality.

## Features

- **Job Listings**: Display jobs grouped by departments
- **Search & Filters**: Search by title, filter by department, location, and function
- **Job Details**: Detailed view of individual job postings
- **Social Sharing**: Share job openings on Facebook, LinkedIn, and Twitter
- **Responsive Design**: Works on desktop and mobile devices
- **URL State Management**: Filters are preserved in URL for bookmarking and sharing

## Tech Stack

- React 18 with Hooks
- React Router for navigation
- Axios for API calls
- SASS for styling
- Vite for build tool

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── SearchFilters.jsx
│   ├── JobList.jsx
│   └── SocialShare.jsx
├── pages/              # Page components
│   ├── JobListPage.jsx
│   └── JobDetailsPage.jsx
├── services/           # API service layer
│   └── api.js
├── styles/             # SASS stylesheets
│   ├── components/
│   |    └── JobList.scss
│   |    └── SearchFilters.scss
│   |    └── SocialShare.scss
│   ├── pages/
│   |     └── jobDetails.scss
│   |     └── jobListPage.scss
│   └── global.scss
├── App.jsx
└── main.jsx
```

## API Integration

The application integrates with the Jobsoid API:

- Base URL: `https://demo.jobsoid.com/api/v1`
- Endpoints:
  - `/jobs` - List all jobs with filtering
  - `/jobs/{id}` - Get job details
  - `/departments` - Get departments lookup
  - `/locations` - Get locations lookup
  - `/functions` - Get functions lookup

## Features Implementation

### Search and Filtering
- Text search by job title
- Dropdown filters for department, location, and function
- Active filter tags with remove functionality
- Clear all filters option
- URL parameter persistence

### Job Listings
- Jobs grouped by department
- Responsive card layout
- Apply and View buttons
- Job metadata display

### Job Details
- Full job description
- Application button linking to external form
- Related jobs from same department
- Social sharing functionality
- Breadcrumb navigation

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interfaces
- Optimized for various screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Lazy loading of job details
- Efficient API calls with proper error handling
- Optimized bundle size with Vite
- CSS-only animations for smooth interactions