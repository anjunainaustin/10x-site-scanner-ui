# 10 Site-Scanner Customizable UI

This repository contains the customizable user interface to the [Site Scanning API](https://site-scanning.app.cloud.gov/).

## How to Use It

Each file inside `src/pages` corresponds to a page that will be served when the app is running. For instance, `src/uswds.js` will be rendered at `http://localhost:8000/uswds/` whent the app is running locally.

### Customizing Columns

Both the columns displayed as well as the filters applied to the data can be customized in `src/data/config.yml`.

The API responds with an array of JSON objects that look like this:

```
{
        "domain": "archives.gov",
        "scantype": "200scanner",
        "domaintype": "Federal Agency - Executive",
        "organization": "National Archives and Records Administration",
        "agency": "National Archives and Records Administration",
        "data": {
            "/": "200",
            "/cj": "200",
            "/code//json": "200",
            "/data": "200",
            "/data//json": "200",
            "/developer": "200",
            "/digitalstrategy": "200",
            "/digitalstrategy/FITARAmilestones//json": "404",
            "/digitalstrategy/bureaudirectory//json": "404",
            "/digitalstrategy/costsavings//json": "404",
            "/digitalstrategy/datacenteroptimizationstrategicplan//json": "404",
            "/digitalstrategy/governanceboards//json": "404",
            "/open": "200",
            "/privacy": "200",
            "/robots//txt": "200",
            "/sitemap//xml": "200"
        },
        "scan_data_url": "https://site-scanning.app.cloud.gov/api/v1/scans/200scanner/archives.gov/",
        "lastmodified": "2020-03-10T10:04:03Z"
    },
```

To parse data like this into a nicely formatted table, just add the names of the fields of intrerest from the API response to the list of columns in the configuration file as keys, and specify a friendly human readable name for the column header. For instance, if you want your results for the `200scanner` to include only the domain, the agency, and the status code, add the following to the `config.yml`:

```
search200:
  columns:
    domain: Domain
    agency: Agency
    status_code: Status Code
```

!["Table showing cutom columns"](/docs/img/custom-columns.png)

The text following the colon will be the column header, and can be whatever will be meaningful to you.

## Customizing Filters

Just like columns, the filters available can be customized via YAML. Adding filters to the above example would look like:

```
search200:
  filters:
    - agency
    - domain
    - page-type
  columns:
    domain: Domain
    agency: Agency
    status_code: Response Code
```

The following filters are available to be applied to any scan:

- `domain`
- `scan-date`
- `agency`
- `organization`
- `branch`

By default, filters that use select lists (`agency`, `branch`, and `organization`) will download a list of values from the API. However, if you only need data for a subset of agencies (or organizizations, etc.) you can further customize these filters by specifying which options should be available as a nested list in the YAML:

```
search200:
  filters:
    - agency:
      - Consumer Financial Protection Bureau
      - Government Publishing Office
    - domain
    - page-type:
      - "/"
      - "/cj"
  columns:
    domain: Domain
    agency: Agency
    status_code: Response Code
```

This will also limit the default query when the page load (or when "All" is selected from a filter) to values matching those in the specified filter options.
