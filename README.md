# LOD_Navigator

*Tracing movements of Italian Shoah victims*

The LOD NAVIGATOR takes in input the data made available by the Contemporary Jewish Documentation Center (CDEC) in Milan, in collaboration with regesta.exe, and published in Linked Open Data format to show the movements of the Italian victims of Shoah. To this end, we used the SPARQL endpoint to collect biographical data together with information about the persecution and deportation of each victim. The places of birth, arrest, detention, deportation to a Nazi camp, transfer, and return after liberation (if available) were georeferenced and associated to the corresponding date. All the movements are then displayed in an interactive interface.

# Instructions:

### Running the application
In order to run the Lod Navigator application type these commands after cloning this repository: 

    cd lod_navigator_src
    npm install
	npm run start

### Building the application
	npm run dist	(to build all versions)
	npm run dist:mac	(to biuld mac version)
	npm run dist:win	(to biuld win version)
	npm run dist:linux	(to build linux version)

## Reference
Rachele Sprugnoli, Moretti Giovanni, Tonelli Sara.
LOD Navigator: Tracing Movements of Italian Shoah Victims.
In *Umanistica Digitale*,  No. 4, 2019
[https://umanisticadigitale.unibo.it/article/view/9050/8948]
