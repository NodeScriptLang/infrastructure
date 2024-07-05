import fs from 'node:fs/promises';
import path from 'path';

const tiers = [
    {
        tier: 'default',
        groups: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    },
    {
        tier: 'incubator',
        groups: ['a', 'b'],
    },
];

const notice = `
###########################################################
# THESE FILES ARE AUTO-GENERATED                          #
#                                                         #
# Do not edit them manually.                              #
# Instead, make changes to files inside "template/"       #
# and regenerate with "node generate.mjs"                 #
###########################################################
`

const baseDir = new URL('.', import.meta.url).pathname;
const templateDir = path.join(baseDir, 'template');
const targetDir = path.join(baseDir, 'overlays/production/generated');
const templateFiles = await fs.readdir(templateDir)

for (const filename of templateFiles) {
    const templateFile = path.join(templateDir, filename);
    const templateContent = await fs.readFile(templateFile, 'utf-8');
    const targetFile = path.join(targetDir, filename);
    const targetDocs = [];
    for (const { tier, groups } of tiers) {
        for (const group of groups) {
            const doc = templateContent.replace(/\$TIER/g, tier).replace(/\$GROUP/g, group).trim();
            targetDocs.push(doc);
        }
    }
    await fs.writeFile(targetFile, notice + targetDocs.join('\n---\n'), 'utf-8');
    console.info(`Written ${targetFile}`);
}
