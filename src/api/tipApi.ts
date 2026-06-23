export interface DailyTip {
  tip: string;
  source: string;
}

export const fetchDailyTip = async (): Promise<DailyTip> =>  {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        if(!response.ok) throw new Error('Failed to fetch tip');
        const data = await response.json();
        return {
            tip:data.text,
            source: data.source_url,
        };
    } catch (error) {
        return { 
            tip: 'Stay focused and complete your tasks one step at a time!',
            source: '',
        };
    }
};