function insertCommandsMarkup() {
    fetch('files/parkourCommands.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data, 'parkour-commands', createCommandSummary);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function insertPlaceholdersMarkup() {
    fetch('files/parkourPlaceholders.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data, 'parkour-placeholders', createPlaceholderSummary);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function appendData(data, elementId, markupCallback) {
    data = data.reverse();
    let mainContainer = document.getElementById(elementId);

    for (const datum of data) {
        mainContainer.insertAdjacentHTML('afterend', markupCallback(datum));
    }
}

function createCommandSummary(command) {
    return `<details>
                <summary><strong>${command.command}</strong> - ${command.title}</summary>
                <div>
                    <table>
                    <tbody>
                        <tr>
                            <th scope="row">Syntax</th>
                            <td><code>/pa ${command.command} ${command.arguments || ''}</code></td>
                        </tr>
                        <tr>
                            <th scope="row">Example</th>
                            <td><code>${command.example}</code></td>
                        </tr>
                        <tr>
                            <th scope="row">Permission</th>
                            <td><code>${command.permission || 'None required'}</code></td>
                        </tr>
                        <tr>
                            <th scope="row">Console Command</th>
                            <td><code>${command.consoleSyntax || 'N/A'}</code></td>
                        </tr>
                        <tr>
                            <th scope="row">Description</th>
                            <td>${command.description}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </details>`;
}

function createPlaceholderSummary(placeholderGroup) {
    let placeholderDetails = createPlaceholderDetailsSummary(placeholderGroup);
    return `<h5>${placeholderGroup.heading}</h5>${placeholderGroup.description}${placeholderDetails}`;
}

function createPlaceholderDetailsSummary(placeholderGroup) {
    let result = '';
    for (const placeholder of placeholderGroup.placeholders) {
        result += `<details>
            <summary><strong>${placeholder.placeholder}</strong></summary>
            <div>
                <table>
                <tbody>
                    <tr>
                        <th scope="row">Placeholder</th>
                        <td><code>${placeholder.placeholder}</code></td>
                    </tr>
                    <tr>
                        <th scope="row">Example output</th>
                        <td><code>${placeholder.output}</code></td>
                    </tr>
                    <tr>
                        <th scope="row">Description</th>
                        <td>${placeholder.description}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </details>`;
    }

    return result;
}
