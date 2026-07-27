import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function PopData_NotAsync()
{
	// Loading Pop Datas
	let popList = [{ "Num":"SE",   "Id":"60100", "Group":"",   "Price":"010.90", "Gender":"F", "Type":"Pops!",            "Name":"Yara Flor (Future State)" }];
	return popList;
}
async function PopData_Async()
{
	// Fetch the data file
	let response = await fetch('./datas/datas.json');

	// Get the response data as JSON
	let jsonDatas = await response.json();
	
	// return the datas
	return jsonDatas;
}

function IsPopMatchGroup(item, selectGroupValue)
{
	// str += '<option id="selectGroupALL" value="ALL">Toutes les Pops</option>';
	if (selectGroupValue == 'ALL') return true;

	// str += '<option id="selectGroupLUC" value="LUC">Pops chez Lucile</option>';
	if ((selectGroupValue == 'LUC') && (item["Group"] == "LUC")) return true;

	// str += '<option id="selectGroupSAR" value="SAR">Pops chez Sarah</option>';
	if ((selectGroupValue == 'SAR') && (item["Group"] == "SAR")) return true;

	// str += '<option id="selectGroupMAS" value="HOM">Pops Masculines</option>';
	if ((selectGroupValue == 'HOM') && (item["Gender"] == "H")) return true;

	// str += '<option id="selectGroupABM" value="ABM">Pops Abimées</option>';
	if ((selectGroupValue == 'ABM') && (item["Group"] == "ABM")) return true;

	// str += '<option id="selectGroupREC" value="REC">Pops Recherchées</option>';
	if ((selectGroupValue == 'REC') && (item["Group"] == "REC")) return true;

	// str += '<option id="selectGroupCMD" value="CMD">Pops Commandées</option>';
	if ((selectGroupValue == 'CMD') && (item["Group"] == "CMD")) return true;

	// str += '<option id="selectGroupPOS" value="POS">Pops Possédées</option>';
	// The Posseded are TOP + ABM + LUC + SAR
	if ((selectGroupValue == 'POS') && (
		(item["Group"] == "TOP") || 
		(item["Group"] == "ABM") || 
		(item["Group"] == "LUC") ||
		(item["Group"] == "SAR")
	)) return true;

	// Otherwise
	return false;
}
function IsPopMatchSelectValue(item, field, selectValue)
{
	// Good ?
	if (('ALL' == selectValue) || (item[" + field + "] == selectValue))	return true;

	// or not ...
	return false;
}
function IsPopMatchLicense(item, selectLicenseValue)
{
	// Good License ?
	if (('ALL' == selectLicenseValue) || (item["License"] == selectLicenseValue))	return true;

	// Otherwise
	return false;
}
function IsPopMatchZone(item, selectZoneValue)
{
	// Good Zone ?
	if (('ALL' == selectZoneValue) || (item["Zone"] == selectZoneValue))	return true;

	// Otherwise
	return false;
}
function IsPopMatchType(item, selectTypeValue)
{
	// Good Type ?
	if (('ALL' == selectTypeValue) || (item["Type"] == selectTypeValue))	return true;

	// Otherwise
	return false;
}
function IsPopMatchInput(item, inputPopInfoValue)
{
	if ((item["Num"].includes(inputPopInfoValue) == true) ||
		(item["Id"].includes(inputPopInfoValue) == true) ||
		(item["Group"].includes(inputPopInfoValue) == true) ||
		(item["Group"].toUpperCase().includes(inputPopInfoValue.toUpperCase()) == true) ||
		(item["License"].includes(inputPopInfoValue) == true) ||
		(item["License"].toUpperCase().includes(inputPopInfoValue.toUpperCase()) == true) ||
		(item["Name"].includes(inputPopInfoValue) == true) ||
		(item["Name"].toUpperCase().includes(inputPopInfoValue.toUpperCase()) == true))
		return true;
	return false;
}

function GetRowColor(item)
{
	if (item["Group"] == 'CMD')		return '<tr style="background-color:skyblue;">';
	if (item["Group"] == 'REC')		return '<tr style="background-color:red;">';
	if (item["Group"] == 'ABM')		return '<tr style="background-color:gray;">';
	if (item["Group"] == 'LUC')		return '<tr style="background-color:olive;">';
	if (item["Group"] == 'SAR')		return '<tr style="background-color:olive;">';
	if (item["Gender"] == 'H')		return '<tr style="background-color:green;">';
	return '<tr>';
}
function IsObjectAlreadyInList(list, str)
{
	for (let i = 0; i < list.length; i++)
	{
		if (list[i] == str) return true;
	}
	return false;
}
function GetObjectWithFieldAlreadyInList(list, field, str)
{
	for (let i = 0; i < list.length; i++)
	{
		if (list[i][field] == str) return list[i];
	}
	return null;
}

async function CreateSelectGroup()
{
	// Starting the HTML section Select
	//let str = '<select id="selectGroup" style="height: 40px; font-size: 16px;">';
	let str = '<select id="selectGroup">';

	// Group Options with Ids
	str += '<option id="selectGroupPOS" value="POS">Pops Possédées</option>';
	str += '<option id="selectGroupCMD" value="CMD">Pops Commandées</option>';
	str += '<option id="selectGroupREC" value="REC">Pops Recherchées</option>';
	str += '<option id="selectGroupABM" value="ABM">Pops Abimées</option>';
	str += '<option id="selectGroupMAS" value="HOM">Pops Masculines</option>';
	str += '<option id="selectGroupLUC" value="LUC">Pops chez Lucile</option>';
	str += '<option id="selectGroupSAR" value="SAR">Pops chez Sarah</option>';
	str += '<option id="selectGroupALL" value="ALL">Toutes les Pops</option>';

	// Ending the HTML section Select
	str += '</select>';

	// Send the Generated Select to the HTML of the DIV
	document.getElementById('divGroupResult').innerHTML = str;
}
async function CreateSelectLicenses()
{
	// Empty list of Licenses
	let licenseList = new Array();

	// Get the Pop List
	let popDatas = await PopData_Async();

	// loop on all the item of the Pop List
	for (let i = 0; i < popDatas.length; i++)
	{
		// Get a Item
		let item = popDatas[i];

		// If the License exist
		if (item["License"] != '')
		{
			// If the License is not in the List
			if (IsObjectAlreadyInList(licenseList, item["License"]) == false)
			{
				// Add it
				licenseList.push(item["License"]);
			}				
		}
	}
	
	// Ordering by alphabetic
	licenseList.sort();
	
	// Starting the HTML section Select
	//let str = '<select id="selectLicense" style="height: 40px; font-size: 16px;">';
	let str = '<select id="selectLicense">';

	// 1st Option : ALL
	str += '<option value="ALL">Toutes les Licenses</option>';

	// loop on all the Licenses found
	for (let i = 0; i < licenseList.length; i++)
	{
		// Generate the License Select
		str += '<option value="' + licenseList[i] + '">' + licenseList[i] + '</option>';
	}
	
	// Ending the HTML section Select
	str += '</select>';

	// Send the Generated Select to the HTML of the DIV
	document.getElementById('divLicenseResult').innerHTML = str;
}
async function CreateSelectZones()
{
	// Starting the HTML section Select
	//let str = '<select id="selectZone" style="height: 40px; font-size: 16px;">';
	let str = '<select id="selectZone">';

	// Zone Options with Ids
	str += '<option value="ALL">Toutes les Zones</option>';

	str += '<option value="SA1">SA1</option>';
	str += '<option value="SA2">SA2</option>';
	str += '<option value="SA3">SA3</option>';
	str += '<option value="SA4">SA4</option>';
	str += '<option value="SA5">SA5</option>';
	str += '<option value="SA6">SA6</option>';
	str += '<option value="SA7">SA7</option>';

	str += '<option value="SB1">SB1</option>';
	str += '<option value="SB2">SB2</option>';
	str += '<option value="SB3">SB3</option>';
	str += '<option value="SB4">SB4</option>';
	str += '<option value="SB5">SB5</option>';
	str += '<option value="SB6">SB6</option>';
	str += '<option value="SB7">SB7</option>';

	str += '<option value="SC1">SC1</option>';
	str += '<option value="SC2">SC2</option>';
	str += '<option value="SC3">SC3</option>';
	str += '<option value="SC4">SC4</option>';
	str += '<option value="SC5">SC5</option>';
	str += '<option value="SC6">SC6</option>';
	str += '<option value="SC7">SC7</option>';

	str += '<option value="SD1">SD1</option>';
	str += '<option value="SD2">SD2</option>';
	str += '<option value="SD3">SD3</option>';
	str += '<option value="SD4">SD4</option>';
	str += '<option value="SD5">SD5</option>';
	str += '<option value="SD6">SD6</option>';
	str += '<option value="SD7">SD7</option>';

	str += '<option value="SE1">SE1</option>';
	str += '<option value="SE2">SE2</option>';
	str += '<option value="SE3">SE3</option>';
	str += '<option value="SE4">SE4</option>';
	str += '<option value="SE5">SE5</option>';
	str += '<option value="SE6">SE6</option>';
	str += '<option value="SE7">SE7</option>';

	str += '<option value="SF1">SF1</option>';
	str += '<option value="SF2">SF2</option>';
	str += '<option value="SF3">SF3</option>';
	str += '<option value="SF4">SF4</option>';
	str += '<option value="SF5">SF5</option>';
	str += '<option value="SF6">SF6</option>';
	str += '<option value="SF7">SF7</option>';

	str += '<option value="SG1">SG1</option>';
	str += '<option value="SG2">SG2</option>';
	str += '<option value="SG3">SG3</option>';
	str += '<option value="SG4">SG4</option>';
	str += '<option value="SG5">SG5</option>';
	str += '<option value="SG6">SG6</option>';
	str += '<option value="SG7">SG7</option>';

	str += '<option value="SH1">SH1</option>';
	str += '<option value="SH2">SH2</option>';
	str += '<option value="SH3">SH3</option>';
	str += '<option value="SH4">SH4</option>';
	str += '<option value="SH5">SH5</option>';
	str += '<option value="SH6">SH6</option>';
	str += '<option value="SH7">SH7</option>';

	str += '<option value="CA1">CA1</option>';
	str += '<option value="CA2">CA2</option>';
	str += '<option value="CA3">CA3</option>';
	str += '<option value="CA4">CA4</option>';
	str += '<option value="CA5">CA5</option>';

	str += '<option value="CB1">CB1</option>';
	str += '<option value="CB2">CB2</option>';
	str += '<option value="CB3">CB3</option>';
	str += '<option value="CB4">CB4</option>';
	str += '<option value="CB5">CB5</option>';

	str += '<option value="CC1">CC1</option>';
	str += '<option value="CC2">CC2</option>';
	str += '<option value="CC3">CC3</option>';
	str += '<option value="CC4">CC4</option>';
	str += '<option value="CC5">CC5</option>';

	str += '<option value="CD1">CD1</option>';
	str += '<option value="CD2">CD2</option>';
	str += '<option value="CD3">CD3</option>';
	str += '<option value="CD4">CD4</option>';
	str += '<option value="CD5">CD5</option>';

	str += '<option value="CE1">CE1</option>';
	str += '<option value="CE2">CE2</option>';
	str += '<option value="CE3">CE3</option>';
	str += '<option value="CE4">CE4</option>';
	str += '<option value="CE5">CE5</option>';

	str += '<option value="CF1">CF1</option>';
	str += '<option value="CF2">CF2</option>';
	str += '<option value="CF3">CF3</option>';
	str += '<option value="CF4">CF4</option>';
	str += '<option value="CF5">CF5</option>';

	str += '<option value="BOY">BOY</option>';
	str += '<option value="CUI">CUI</option>';
	str += '<option value="FRI">FRI</option>';

	// Ending the HTML section Select
	str += '</select>';

	// Send the Generated Select to the HTML of the DIV
	document.getElementById('divZoneResult').innerHTML = str;
}
async function CreateSelectType()
{
	// Empty list of Type
	let typeList = new Array();

	// Get the Pop List
	let popDatas = await PopData_Async();

	// Loop on all the item of the Pop List
	for (let i = 0; i < popDatas.length; i++)
	{
		// Get a Item
		let item = popDatas[i];

		// If the Type of Pops exist
		if (item["Type"] != '')
		{
			// If the Type is not in the List
			if (IsObjectAlreadyInList(typeList, item["Type"]) == false)
			{
				// Add it
				typeList.push(item["Type"]);
			}				
		}
	}
	
	// Ordering by alphabetic
	typeList.sort();
	
	// Starting the HTML section Select
	//let str = '<select id="selectType" style="height: 40px; font-size: 16px;">';
	let str = '<select id="selectType">';

	// 1st Option : ALL
	str += '<option value="ALL">Tous les Types</option>';

	// Loop on all the Type found
	for (let i = 0; i < typeList.length; i++)
	{
		// Generate the License Select
		str += '<option value="' + typeList[i] + '">' + typeList[i] + '</option>';
	}
	
	// Ending the HTML section Select
	str += '</select>';

	// Send the Generated Select to the HTML of the DIV
	document.getElementById('divTypeResult').innerHTML = str;
}

async function CheckFullPopTable()
{
	// Empty list of Object
	let objectList = new Array();

	// Loading Pop File
	let popDatas = await PopData_Async();

	// CHECK 1
	//
	// Verify that the Id of the Pops is not multiple times 

	// loop on all the item of the Pop List
	for (let i = 0; i < popDatas.length; i++)
	{
		// Get a Item
		let item = popDatas[i];

		// If the License exist
		if (item["Id"] != '')
		{
			// If the License is not in the List
			let itemFound = GetObjectWithFieldAlreadyInList(objectList, 'Id', item["Id"]);

			// Not found ?
			if (itemFound == null)
			{
				// Add it
				objectList.push(item);
			}
			else
			{
				// Check the Num of the 2 Objects
				if (itemFound["Num"] == item["Num"])
				{
					// Same Id and same Num => 2 Pops : 1 diamant and the other not
				}
				else
				{
					// Same Id and different Num
					console.log('ATTENTION: Id already exist : Id=' + item["Id"] + ' / Num=' + item["Num"]);
				}
			}
		}
		else
		{
			// Found a pop with no Id
			console.log('ATTENTION: No Id for this Pop : Num=' + item["Num"] + ', Type=' + item["Type"] + ', Name=' + item["Name"]);
		}
	}

	// CHECK 2
	//
	// Verify the Group

	// Loop on all the item of the Pop List
	for (let i = 0; i < popDatas.length; i++)
	{
		// Get a Item
		let item = popDatas[i];
	
		// If the Group is not in the list
		if ((item["Group"] != 'ABM') && (item["Group"] != 'REC') && (item["Group"] != 'CMD') && (item["Group"] != 'LUC') && (item["Group"] != 'SAR') && (item["Group"] != 'TOP'))
		{
			console.log('ATTENTION: No Group for this Pop : Num=' + item["Num"] + ', Group=' + item["Group"] + ', Name=' + item["Name"]);
		}
	}

	// CHECK 3
	//
	// Verify the Zone with the Group

	// Loop on all the item of the Pop List
	for (let i = 0; i < popDatas.length; i++)
	{
		// Get a Item
		let item = popDatas[i];
	
		// If the Zone id empty
		if (item["Zone"] == '')
		{
			// If it's not a Searched Pop, a commander Pop or a Chez Lucile Pop or Cgez Sarah Pop
			if ((item["Group"] != 'REC') && (item["Group"] != 'CMD') && (item["Group"] != 'LUC') && (item["Group"] != 'SAR'))
			{
				console.log('ATTENTION: No Zone for this Pop : Num=' + item["Num"] + ', Group=' + item["Group"] + ', Name=' + item["Name"]);
			}
		}
	}
}

async function FullRefresh()
{
	// Get the value of the Select Type
	let selectGroupValue = document.getElementById('selectGroup').value;

	// Repositonning some Values
	/*
	if (selectGroupValue == 'CMD')
	{
		let $select = document.querySelector('#selectLicense');
		let $options = Array.from($select.options);
		let optionToSelect = $options.find(item => item.value === 'ALL');
		optionToSelect.selected = true;
	}
	*/

	// Get the value of the Select License
	let selectLicenseValue = document.getElementById('selectLicense').value;

	// Get the value of the Select Zone
	let selectZoneValue = document.getElementById('selectZone').value;

	// Get the value of the Select Type
	let selectTypeValue = document.getElementById('selectType').value;

	// Get the value of the Input
	let inputPopInfoValue = document.getElementById('inputPopInfo').value;

	// Create the table with the infos
	CreateTableResults(selectGroupValue, selectLicenseValue, selectZoneValue, selectTypeValue, inputPopInfoValue);	
}
async function FullReset()
{
	// Repositionning the Selects
	document.getElementById("selectGroup").value = 'POS';
	document.getElementById("selectLicense").value = 'ALL';
	document.getElementById("selectZone").value = 'ALL';
	document.getElementById("selectType").value = 'ALL';
	document.getElementById("inputPopInfo").value = '';

	// And refresh
	await CreateTableResults('POS', 'ALL', 'ALL', 'ALL', '');
}

async function CreateTableResults(selectGroupValue, selectLicenseValue, selectZoneValue, selectTypeValue, inputPopInfoValue)
{
	console.log('CreateTableResults(Group=' + selectGroupValue + ', License=' + selectLicenseValue + ', Zone=' + selectZoneValue + ', Type=' + selectTypeValue + ', inputPopInfoValue=' + inputPopInfoValue + ')');

	// Init
	let numberOfPopFound = 0;
	let totalEstimation = 0.0;
	let numberOfPopALL = 0;
	let numberOfPopCMD = 0;
	let numberOfPopREC = 0;
	let numberOfPopABM = 0;
	let numberOfPopLUC = 0;
	let numberOfPopSAR = 0;
	let numberOfPopMAS = 0;

	// Loading Pop File
	//let popDatas = PopData_NotAsync();
	let popDatas = await PopData_Async();

	// Starting the HTML section Table
	let str = '<br><table border="1"><tbody>';

	// Add it to the list
	str += '<tr style="background-color:skyblue;">';
	str += '<td><b><font color="#000000">Num.</b></td>';
	str += '<td><b><font color="#000000">Code</b></td>';
	str += '<td><b><font color="#000000">Zones</b></td>';
	str += '<td><b><font color="#000000">Infos</b></td>';
	str += '<td><b><font color="#000000">Prix</b></td>';
	str += '<td><b><font color="#000000">Etat</b></td>';
	str += '<td><b><font color="#000000">Genre</b></td>';
	str += '<td><b><font color="#000000">Type</b></td>';
	str += '<td><b><font color="#000000">License</b></td>';
	str += '<td><b><font color="#000000">Nom</b></td>';
	str += '</tr>';

	// loop on all the item of the Pop List
	for (let i = 0; i < popDatas.length; i++)
	{
		// Get a Item
		let item = popDatas[i];

		// Pop Counting
		numberOfPopALL++;
		if (item["Group"] == 'CMD') numberOfPopCMD++;
		if (item["Group"] == 'REC') numberOfPopREC++;
		if (item["Group"] == 'ABM') numberOfPopABM++;
		if (item["Group"] == 'LUC') numberOfPopLUC++;
		if (item["Group"] == 'SAR') numberOfPopSAR++;
		if (item["Gender"] == 'H') numberOfPopMAS++;

		// Good Group ? 
		if (IsPopMatchGroup(item, selectGroupValue) == true)
		{
			// Good License ?
			if (IsPopMatchLicense(item, selectLicenseValue) == true)
			{
				// Good Zone ?
				if (IsPopMatchZone(item, selectZoneValue) == true)
				{
					// Good Type ?
					if (IsPopMatchType(item, selectTypeValue) == true)
					{
						// Good input ?
						if (IsPopMatchInput(item, inputPopInfoValue) == true)
						{
							// Color of the Row
							str += GetRowColor(item);

							// Different row Informations
							str += '<td>' + item["Num"] + '</td>';
							str += '<td>' + item["Id"] + '</td>';
							str += '<td>' + item["Zone"] + '</td>';
							str += '<td>' + item["Group"] + '</td>';
							str += '<td>' + item["Price"] + '</td>';
							str += '<td>' + item["State"] + '</td>';
							str += '<td>' + item["Gender"] + '</td>';
							str += '<td>' + item["Type"] + '</td>';
							str += '<td>' + item["License"] + '</td>';
							str += '<td>' + item["Name"] + '</td>';
							str += '</tr>';
							str += '</tr>';

							// One more Found
							numberOfPopFound++;
						}
					}
				}
			}
		}

		// Computation Estimation
		if (item["Price"] != 'XXXXXX') { if (item["Group"] != 'REC') { totalEstimation += (parseFloat(item["Price"] * 100) / 100); }}
	}
	
	// Add it to the list
	//str += '<tr>';
	//str += '<td><img src="/ViteProject/images/60100.webp" width="32" height="32" /></td>';
	//str += '</tr>';

	// Ending the HTML section Table
	str += '</tbody></table>';

	// Send the generated Table to the HTML of the DIV
	document.getElementById('divTableReult').innerHTML = str;

	// Update the Select Options
	document.getElementById("selectGroupPOS").text = 'Pops Possédées (' + (numberOfPopALL-numberOfPopREC-numberOfPopCMD) + ')';
	document.getElementById("selectGroupCMD").text = 'Pops Commandées (' + numberOfPopCMD + ')';
	document.getElementById("selectGroupREC").text = 'Pops Recherchées (' + numberOfPopREC + ')';
	document.getElementById("selectGroupABM").text = 'Pops Abimées (' + numberOfPopABM + ')';
	document.getElementById("selectGroupMAS").text = 'Pops Masculines (' + numberOfPopMAS + ')';
	document.getElementById("selectGroupLUC").text = 'Pops chez Lucile (' + numberOfPopLUC + ')';
	document.getElementById("selectGroupSAR").text = 'Pops chez Sarah (' + numberOfPopSAR + ')';
	document.getElementById("selectGroupALL").text = 'Toutes les Pops (' + numberOfPopALL + ')';

	// Update the Number of Pops Found and the Version
	document.getElementById("versionOfPops").innerHTML = 'Pops found = ' + numberOfPopFound + ' / Version 0.9.92 (2026-07-27)';

	// Console Estimation Infos
	console.log('Estimation Totale = ' + totalEstimation + ' Euros');
}

async function main()
{
	// Create the Select Type Search
	await CreateSelectGroup();
	
	// Create the Select License
	await CreateSelectLicenses();
	
	// Create the Select Zone
	await CreateSelectZones();

	// Create the Select Type
	await CreateSelectType();
	
	// Check
	await CheckFullPopTable();

	// Events
	document.getElementById('buttonReset').addEventListener("click", FullReset);
	document.getElementById('selectGroup').addEventListener("change", FullRefresh);
	document.getElementById('selectLicense').addEventListener("change", FullRefresh);
	document.getElementById('selectZone').addEventListener("change", FullRefresh);
	document.getElementById('selectType').addEventListener("change", FullRefresh);
	document.getElementById('inputPopInfo').addEventListener("keyup", FullRefresh);

	// Create the Table result control
	await CreateTableResults('POS', 'ALL', 'ALL', 'ALL', '');

	// Focus on the Input
	document.getElementById('inputPopInfo').focus();
}

// Main Function
main();
