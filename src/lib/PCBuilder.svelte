<script>
    import StatRoller from "./StatRoller.svelte";
    let stats = {
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

<StatRoller {stats} on:update={(event) => (stats = event.detail)} />
{JSON.stringify(stats)}
