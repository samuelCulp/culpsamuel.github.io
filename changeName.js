        let namingConventions = {};
        let contactData = {};

        async function fetchCSV(file) {
            const response = await fetch(file);
            return await response.text();
        }

        async function loadData() {
            const namingConventionsCSV = await fetchCSV('computernames.csv');
            const contactDataCSV = await fetchCSV('departmentcontacts.csv');

            parseNamingConventionsCSV(namingConventionsCSV);
            parseContactDataCSV(contactDataCSV);

            updateTables('ASKIT'); // Initialize with default table
        }

        function parseNamingConventionsCSV(text) {
            const rows = text.split('\n').slice(1); // Skip the header row
            rows.forEach(row => {
                const [category, name] = row.split(',');

                if (!namingConventions[category]) {
                    namingConventions[category] = [];
                }
                namingConventions[category].push(name);
            });
        }

        function parseContactDataCSV(text) {
            const rows = text.split('\n').slice(1); // Skip the header row
            rows.forEach(row => {
                const [category, contact, email, dept, phone, group] = row.split(',');

                if (!contactData[category]) {
                    contactData[category] = [];
                }
                contactData[category].push({ contact, email, dept, phone, group });
            });
        }

        function updateTable(category) {
            updateNamingConventionTable(category);
            updateContactInfoTable(category);
        }

        function updateNamingConventionTable(category) {
            const tableBody = document.querySelector('#naming-convention-table tbody');
            tableBody.innerHTML = ''; // Clear previous table content

            const names = namingConventions[category] || [];
            const rows = 9;
            const columns = 7;

            let nameIndex = 0;
            for (let i = 0; i < rows; i++) {
                const tr = document.createElement('tr');
                for (let j = 0; j < columns; j++) {
                    const td = document.createElement('td');
                    td.textContent = names[nameIndex] || '';
                    tr.appendChild(td);
                    nameIndex++;
                }
                tableBody.appendChild(tr);
            }
        }

        function updateContactInfoTable(department) {
            const tableBody = document.querySelector('#contact-info-table tbody');
            tableBody.innerHTML = ''; // Clear previous table content

            const rows = contactData[department];
            if (rows) {
                rows.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.contact}</td>
                        <td>${row.email}</td>
                        <td>${row.dept}</td>
                        <td>${row.phone}</td>
                        <td>${row.group}</td>
                    `;
                    tableBody.appendChild(tr);
                });
            }
        }

        window.onload = loadData;
