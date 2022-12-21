<script>
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
</script>

<!-- Table containing stats and bonuses for Combat, Brawn, Agility, Perception, Intelligence, Willpower, and Fellowship -->
<table>
    <thead>
        <tr>
            <th>Stat</th>
            <th>Value</th>
            <th>Bonus</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Combat</td>
            <td>{stats.combat.score}</td>
            <td>{stats.combat.bonus}</td>
        </tr>
        <tr>
            <td>Brawn</td>
            <td>{stats.brawn.score}</td>
            <td>{stats.brawn.bonus}</td>
        </tr>
        <tr>
            <td>Agility</td>
            <td>{stats.agility.score}</td>
            <td>{stats.agility.bonus}</td>
        </tr>
        <tr>
            <td>Perception</td>
            <td>{stats.perception.score}</td>
            <td>{stats.perception.bonus}</td>
        </tr>
        <tr>
            <td>Intelligence</td>
            <td>{stats.intelligence.score}</td>
            <td>{stats.intelligence.bonus}</td>
        </tr>
        <tr>
            <td>Willpower</td>
            <td>{stats.willpower.score}</td>
            <td>{stats.willpower.bonus}</td>
        </tr>
        <tr>
            <td>Fellowship</td>
            <td>{stats.fellowship.score}</td>
            <td>{stats.fellowship.bonus}</td>
        </tr>
    </tbody>
</table>

<style>
    table {
        width: 100%;
    }
</style>
