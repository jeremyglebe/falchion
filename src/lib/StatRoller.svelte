<script>
    import { createEventDispatcher } from "svelte";
    import { roll } from "./Shared";
    import StatTable from "./StatTable.svelte";

    /** Stats prop which can be accessed externally */
    export let stats = {
        combat: {
            score: 0,
            bonus: 0,
        },
        brawn: {
            score: 0,
            bonus: 0,
        },
        agility: {
            score: 0,
            bonus: 0,
        },
        perception: {
            score: 0,
            bonus: 0,
        },
        intelligence: {
            score: 0,
            bonus: 0,
        },
        willpower: {
            score: 0,
            bonus: 0,
        },
        fellowship: {
            score: 0,
            bonus: 0,
        },
    };

    /** List of selected stats */
    let selected = [];
    /** Flag marking when initial roll has been completed */
    let fl_StatsRolled = false;
    /** Flag marking when Mercy adjustments have completed */
    let fl_Mercy = false;
    /** Event emitter */
    const emit = createEventDispatcher();

    function rollStats(statRollString) {
        // Rolls the base scores for each stat
        stats.combat.score = roll(statRollString);
        stats.brawn.score = roll(statRollString);
        stats.agility.score = roll(statRollString);
        stats.perception.score = roll(statRollString);
        stats.intelligence.score = roll(statRollString);
        stats.willpower.score = roll(statRollString);
        stats.fellowship.score = roll(statRollString);
        // For now, assume bonuses are the tens digit of the score
        stats.combat.bonus = Math.floor(stats.combat.score / 10);
        stats.brawn.bonus = Math.floor(stats.brawn.score / 10);
        stats.agility.bonus = Math.floor(stats.agility.score / 10);
        stats.perception.bonus = Math.floor(stats.perception.score / 10);
        stats.intelligence.bonus = Math.floor(stats.intelligence.score / 10);
        stats.willpower.bonus = Math.floor(stats.willpower.score / 10);
        stats.fellowship.bonus = Math.floor(stats.fellowship.score / 10);
        // Set the flag to true
        fl_StatsRolled = true;
        // Emit the stats update event
        emitUpdate();
    }

    /** Handler for checkboxes */
    function handleCheckbox(event) {
        // Get the stat name from the checkbox's id
        const statName = event.target.id.split("-")[1];
        // If the checkbox is checked, add the stat to the list of selected stats
        if (event.target.checked) {
            // If two stats are already selected, remove and uncheck the first one
            if (selected.length === 2) {
                const firstStat = selected[0];
                const checkBox = /** @type {HTMLInputElement} */ (document.getElementById(`checkbox-${firstStat}`));
                checkBox.checked = false;
                selected = selected.slice(1);
            }
            // Weird way of pushing... Svelte only reacts to assignments, not mutations/methods
            selected = [...selected, statName];
        }
        // Otherwise, remove the stat from the list of selected stats
        else {
            selected = selected.filter((stat) => stat !== statName);
        }
    }

    function swapStats() {
        // Swap the scores of the two selected stats
        const temp = stats[selected[0]].score;
        stats[selected[0]].score = stats[selected[1]].score;
        stats[selected[1]].score = temp;
        // Uncheck the checkboxes
        const checkBox1 = /** @type {HTMLInputElement} */ (document.getElementById(`checkbox-${selected[0]}`));
        checkBox1.checked = false;
        const checkBox2 = /** @type {HTMLInputElement} */ (document.getElementById(`checkbox-${selected[1]}`));
        checkBox2.checked = false;
        // Clear the list of selected stats
        selected = [];
        // Set the mercy flag
        fl_Mercy = true;
        // Emit the stats update event
        emitUpdate();
    }

    function raiseStat(newScore) {
        // Raise the score of the first selected stat
        stats[selected[0]].score = newScore;
        // Uncheck the checkbox
        const checkBox = /** @type {HTMLInputElement} */ (document.getElementById(`checkbox-${selected[0]}`));
        checkBox.checked = false;
        // Clear the list of selected stats
        selected = [];
        // Set the mercy flag
        fl_Mercy = true;
        // Emit the stats update event
        emitUpdate();
    }

    function emitUpdate() {
        // Emit the stats update event
        emit("update", stats);
    }
</script>

{#if !fl_StatsRolled}
    <StatTable {stats} />
    <div id="roll-stats">
        <button on:click={() => rollStats("3D10+25")}>Roll Stats (3D10+25)</button>
        <button on:click={() => rollStats("2D10+35")}>Roll Stats (2D10+35)</button>
    </div>
{/if}
{#if fl_StatsRolled && !fl_Mercy}
    <!-- Table with a header for each stat, scores in the first row, and checkboxes in the second row -->
    <table>
        <thead>
            <tr>
                <th>Stat</th>
                <th>Score</th>
                <th>Select</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Combat</td>
                <td>{stats.combat.score}</td>
                <td><input type="checkbox" id="checkbox-combat" on:change={handleCheckbox} /></td>
            </tr>
            <tr>
                <td>Brawn</td>
                <td>{stats.brawn.score}</td>
                <td><input type="checkbox" id="checkbox-brawn" on:change={handleCheckbox} /></td>
            </tr>
            <tr>
                <td>Agility</td>
                <td>{stats.agility.score}</td>
                <td><input type="checkbox" id="checkbox-agility" on:change={handleCheckbox} /></td>
            </tr>
            <tr>
                <td>Perception</td>
                <td>{stats.perception.score}</td>
                <td><input type="checkbox" id="checkbox-perception" on:change={handleCheckbox} /></td>
            </tr>
            <tr>
                <td>Intelligence</td>
                <td>{stats.intelligence.score}</td>
                <td><input type="checkbox" id="checkbox-intelligence" on:change={handleCheckbox} /></td>
            </tr>
            <tr>
                <td>Willpower</td>
                <td>{stats.willpower.score}</td>
                <td><input type="checkbox" id="checkbox-willpower" on:change={handleCheckbox} /></td>
            </tr>
            <tr>
                <td>Fellowship</td>
                <td>{stats.fellowship.score}</td>
                <td><input type="checkbox" id="checkbox-fellowship" on:change={handleCheckbox} /></td>
            </tr>
        </tbody>
    </table>

    <!-- Buttons for swapping two stats or raising one to 42 -->
    <div>
        {#if selected.length === 2}
            <button on:click={swapStats}>Swap {selected[0]} and {selected[1]}</button>
        {/if}
        {#if selected.length === 1}
            <button on:click={() => raiseStat(42)}>Raise {selected[0]} to 42</button>
        {/if}
    </div>

    <style>
        table {
            width: 100%;
        }
    </style>
{/if}
{#if fl_StatsRolled && fl_Mercy}
    <StatTable {stats} />
{/if}

<style>
    table {
        width: 100%;
    }
</style>
