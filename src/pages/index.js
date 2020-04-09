import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section class="usa-section grid-container text-italic font-serif-lg line-height-serif-4 text-gray-50 padding-3">
      Site Scanner highlights the features contributing to your federal website's success, for free.
    </section>
 
  <h2> Site Scanner is a website scanner for federal government professionals like you.</h2>
    <ul>
   <li>Scans run automatically so results are on-demand</li>
   <li>Daily scan results for the latest data</li>
   <li>Archived results for 30 days to track changes over time</li> 
   <li>Most comprehensive list of {{ num_domains }} federal domains and subdomains updated daily</li>
   <li>Publically-accessible and cloud-based for easy government-wide collaboration</li>
   <li>Scans search for features that most reflect excellence on government websites, according to subject matter experts at OMB, GSA, and DHS</li>
   <li>Customized results accessed directly from the site or using our API</li> 

    </ul>
  </Layout>
);

export default IndexPage;
