// App.js
import { useEffect, useRef, useState } from "react";
// import Menu from "./components/Menu";
import "./App.css";
//#region ShapeRecognition
 //// Shape recognition below ////


  /**
 * The $1 Unistroke Recognizer (JavaScript version)
 *
 *  Jacob O. Wobbrock, Ph.D.
 *  The Information School
 *  University of Washington
 *  Seattle, WA 98195-2840
 *  wobbrock@uw.edu
 *
 *  Andrew D. Wilson, Ph.D.
 *  Microsoft Research
 *  One Microsoft Way
 *  Redmond, WA 98052
 *  awilson@microsoft.com
 *
 *  Yang Li, Ph.D.
 *  Department of Computer Science and Engineering
 *  University of Washington
 *  Seattle, WA 98195-2840
 *  yangli@cs.washington.edu
 *
 * The academic publication for the $1 recognizer, and what should be
 * used to cite it, is:
 *
 *     Wobbrock, J.O., Wilson, A.D. and Li, Y. (2007). Gestures without
 *     libraries, toolkits or training: A $1 recognizer for user interface
 *     prototypes. Proceedings of the ACM Symposium on User Interface
 *     Software and Technology (UIST '07). Newport, Rhode Island (October
 *     7-10, 2007). New York: ACM Press, pp. 159-168.
 *     https://dl.acm.org/citation.cfm?id=1294238
 *
 * The Protractor enhancement was separately published by Yang Li and programmed
 * here by Jacob O. Wobbrock:
 *
 *     Li, Y. (2010). Protractor: A fast and accurate gesture
 *     recognizer. Proceedings of the ACM Conference on Human
 *     Factors in Computing Systems (CHI '10). Atlanta, Georgia
 *     (April 10-15, 2010). New York: ACM Press, pp. 2169-2172.
 *     https://dl.acm.org/citation.cfm?id=1753654
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Copyright (C) 2007-2012, Jacob O. Wobbrock, Andrew D. Wilson and Yang Li.
 * All rights reserved. Last updated July 14, 2018.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University of Washington nor Microsoft,
 *      nor the names of its contributors may be used to endorse or promote
 *      products derived from this software without specific prior written
 *      permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Jacob O. Wobbrock OR Andrew D. Wilson
 * OR Yang Li BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

//
//	ConnectToServer functionality
//
function connectToServer() {
	let ip = document.getElementById("ipAddress").value;
	if (ip.trim() === "") {
		alert("Empty IP address");
		return;
	}

	var socket = new WebSocket("wss://" + ip + ":3004");

	window.sessionId = -1;

	socket.onopen = function () {
		alert("Connected to websocket with ip = " + ip);
	};

	socket.onerror = function () {
		alert("Could not connect to ip = " + ip);
	};

	socket.onmessage = function (event) {
		console.log("Received message = ", event.data);
	};

	window.currentSocket = socket;
}
//
// Point class
//
function Point(x, y) // constructor
{
	this.X = x;
	this.Y = y;
}
//
// Rectangle class
//
function Rectangle(x, y, width, height) // constructor
{
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}
//
// Unistroke class: a unistroke template
//
function Unistroke(name, points) // constructor
{
	this.Name = name;
	this.Points = Resample(points, NumPoints);
	var radians = IndicativeAngle(this.Points);
	this.Points = RotateBy(this.Points, -radians);
	this.Points = ScaleTo(this.Points, SquareSize);
	this.Points = TranslateTo(this.Points, Origin);
	this.Vector = Vectorize(this.Points); // for Protractor
}
//
// Result class
//
function Result(name, score, ms) // constructor
{
	this.Name = name;
	this.Score = score;
	this.Time = ms;
}
//
// DollarRecognizer constants
//
const NumUnistrokes = 4;
const NumPoints = 64;
const SquareSize = 250.0;
const Origin = new Point(0,0);
const Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
const HalfDiagonal = 0.5 * Diagonal;
const AngleRange = Deg2Rad(45.0);
const AnglePrecision = Deg2Rad(2.0);
const Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
//
// DollarRecognizer class
//
function DollarRecognizer() // constructor
{
	//
	// one built-in unistroke per gesture type
	// //
	this.Unistrokes = new Array(NumUnistrokes);
	this.Unistrokes[0] = new Unistroke("Triangle", new Array(new Point(-140.6078548602551,0),new Point(-129.12418961435912,5.4157070005434775),new Point(-115.75319922085748,9.84282256561525),new Point(-101.33466808804633,13.142794507453004),new Point(-87.5774013739624,17.595815350764468),new Point(-73.84166269406728,22.08581770854488),new Point(-61.289074071359664,27.948854369317075),new Point(-49.370406617277126,34.4092488038701),new Point(-37.384788810896225,40.81180853799415),new Point(-26.04319564410764,47.71844838510805),new Point(-13.977928142144378,54.05496658124767),new Point(-2.6151968767796916,60.94495351271584),new Point(9.80934422331893,66.92824395672127),new Point(20.818961685187332,74.06425212905648),new Point(32.81729621940394,80.41609871705376),new Point(44.78249111489663,86.78609047786509),new Point(57.12766548487866,92.7921542465867),new Point(68.8650583016805,99.38408067778036),new Point(81.10709646907355,105.56132798983165),new Point(92.75458622026315,111.94029417725213),new Point(105.58083178478034,117.38725000663757),new Point(109.39214513974491,111.30367688507133),new Point(106.39682326732589,101.2150149729712),new Point(103.02174677355322,91.16500084618482),new Point(99.01479448243401,81.20549477773156),new Point(95.25397399335941,71.19872107179171),new Point(91.62173828229959,61.171035276987396),new Point(87.24157956493298,51.264986215653124),new Point(82.86142084756659,41.35893715431888),new Point(78.48126213020021,31.452888092984665),new Point(74.1011034128336,21.54683903165045),new Point(69.72094469546721,11.640789970316234),new Point(65.34078597810083,1.7347409089819905),new Point(60.96062726073421,-8.171308152352225),new Point(55.716258738661395,-17.86613590965149),new Point(49.61122894069615,-27.34395336994686),new Point(44.76048916089837,-37.13251449564521),new Point(39.47759755726122,-46.81318214725883),new Point(35.059009601302705,-56.7096367470418),new Point(29.397404590388646,-66.29575266257683),new Point(24.81856021137412,-76.14905489206387),new Point(19.32547080117024,-85.7596444440115),new Point(14.945312083803856,-95.66569350534573),new Point(9.31528733555001,-105.08388335563306),new Point(4.935128618183626,-114.98993241696728),new Point(0.5549699008171274,-124.89598147830152),new Point(-5.567647541182737,-132.61274999336246),new Point(-13.593246543325677,-124.15952049918974),new Point(-20.837902122983223,-115.05710487190939),new Point(-27.175206457735044,-105.67768731758567),new Point(-33.54358175104119,-96.29652127472391),new Point(-40.05489755903989,-86.96082553228378),new Point(-46.201895045888136,-77.52087014118867),new Point(-51.87325876515797,-67.92961257835461),new Point(-57.976540262434696,-58.475750848785),new Point(-63.772480154986965,-48.919524484848466),new Point(-69.6224519129371,-39.43389652871656),new Point(-76.03946188034092,-30.11281425650384),new Point(-82.36359873099138,-20.749940747888928),new Point(-89.66345729844204,-11.806756653443387),new Point(-97.65777461017501,-3.283235976284061),new Point(-106.96219984689208,4.840418633737983),new Point(-116.79722415631261,12.594372942041304),new Point(-126.3666042181602,18.949538799483975)));
  this.Unistrokes[1] = new Unistroke("Triangle", new Array(new Point(-152.40216107736887,3.126388037344441e-13),new Point(-141.80228506883623,-7.491067897460567),new Point(-130.20857535582968,-14.034656956919747),new Point(-119.8500093528753,-21.45164739416299),new Point(-107.61263849442571,-27.09072670609342),new Point(-97.34056404834428,-35.05996544267788),new Point(-86.60754871080462,-42.482688266608875),new Point(-76.24898270785002,-49.89967870385212),new Point(-65.21494952599846,-56.955273533981966),new Point(-54.80959649087208,-64.32701609857745),new Point(-44.097134289000905,-71.83741168956544),new Point(-33.48808639560434,-79.02549150134752),new Point(-22.161510124558163,-85.82059578643339),new Point(-11.1590502258573,-92.76515317642925),new Point(0.5192226287824724,-98.84762305077837),new Point(11.73770135771656,-104.30754091836411),new Point(23.74699530259818,-109.86176263514828),new Point(34.63625610907593,-116.352516762521),new Point(42.162891971331646,-122.59640829209036),new Point(52.300383917498266,-129.47261772237127),new Point(55.25784513355302,-126.4113957332708),new Point(55.672622612142504,-115.93538552591579),new Point(55.41985735307662,-104.51366603969956),new Point(57.646885948138106,-92.94194947113921),new Point(59.87391454319982,-81.37023290257886),new Point(62.1009431382613,-69.7985163340185),new Point(64.32797173332301,-58.226799765458196),new Point(66.5550003283845,-46.655083196897834),new Point(68.78202892344598,-35.0833666283375),new Point(71.00905751850769,-23.511650059777168),new Point(73.80521341811777,-12.077970502396965),new Point(77.80473817728353,-0.936157877762156),new Point(80.03176677234478,10.635558690798177),new Point(84.55696338285156,21.413538286638953),new Point(86.78399197791305,32.985254855199315),new Point(89.01102057297453,44.55697142375962),new Point(91.23804916803624,56.12868799231998),new Point(93.46507776309772,67.70040456088034),new Point(95.69210635815944,79.27212112944065),new Point(95.37081032756987,90.33775238847593),new Point(97.59783892263135,101.9094689570363),new Point(97.05119688334207,111.80419466581813),new Point(94.56688130358884,120.52738227762879),new Point(81.80070876491095,118.64000097730033),new Point(70.44654572152899,111.7751528556914),new Point(59.09238267814726,104.91030473408242),new Point(47.71422381601474,98.09376087202085),new Point(35.03454017306399,93.89722308157175),new Point(22.656047796669327,88.82650266143887),new Point(10.068311906008375,84.39961287534445),new Point(-2.7087450573026217,79.90859666195601),new Point(-14.840367498185742,74.1615364351679),new Point(-28.06461529866033,70.34373823187147),new Point(-40.83215758749134,65.69014122102143),new Point(-53.65688656550424,61.51770765861565),new Point(-66.44418654717606,57.26992847151328),new Point(-77.34824480993734,50.67721850275288),new Point(-89.13010747377803,45.32005193526888),new Point(-99.38265367280701,37.64041615720069),new Point(-111.81602840037954,33.37017539902439),new Point(-121.06955978907445,28.589572589771706),new Point(-130.84054764417715,22.88920432577453),new Point(-139.0804499449032,18.279680007676006),new Point(-147.32035224562787,13.67015568957595),));
  this.Unistrokes[2] = new Unistroke("Circle", new Array(new Point(-123.53709269358478,5.684341886080802e-14),new Point(-128.70839810574353,8.71765518595123),new Point(-128.3539791015437,20.595280290547862),new Point(-126.99221729805049,32.736388429256465),new Point(-124.56483415097637,44.56850329580038),new Point(-120.81749718239098,56.01787728269477),new Point(-114.94192010133838,67.02647069722298),new Point(-108.80131759302822,78.03238088595032),new Point(-99.10325794142136,86.64878138876543),new Point(-89.26745903248184,95.29518098171093),new Point(-77.70010999712804,101.73174117403812),new Point(-65.46145907418486,107.70768778108766),new Point(-52.309094576532516,111.29337239734969),new Point(-39.40172089323778,116.2924334360871),new Point(-26.569523977423614,119.88309580383725),new Point(-13.51739371531221,121.96695887244118),new Point(-0.38520003053781693,123.82757388413847),new Point(13.831338772478375,122.66461167902912),new Point(28.047877575494113,121.50164947391977),new Point(42.264416378510305,120.3386872688103),new Point(54.6801215323394,116.27981618600836),new Point(67.54300463335312,111.87703721673972),new Point(77.90608630548468,104.51735566435809),new Point(85.86298157768579,95.8555410043856),new Point(92.88091661139288,85.51459037073937),new Point(99.86747989555215,75.05716899698825),new Point(104.4542763981799,63.75369765453996),new Point(106.52408992364144,51.804464708584305),new Point(110.80312562075733,40.1998828056673),new Point(114.00690924802893,28.314055354565824),new Point(118.28594494514437,16.70947345164882),new Point(119.30410167331593,4.70143752707645),new Point(121.29160189425647,-7.252397935116505),new Point(120.16650638658302,-19.380272970431974),new Point(118.80474458308936,-31.521381109140577),new Point(117.44298277959615,-43.66248924784918),new Point(116.08122097610249,-55.80359738655778),new Point(114.71945917260882,-67.94470552526639),new Point(113.35769736911516,-80.08581366397499),new Point(110.49199998474705,-91.79083258669806),new Point(104.45959576579617,-102.57761623504473),new Point(93.84694410961265,-110.64210994575433),new Point(82.42618799613228,-117.2748805760844),new Point(69.7383871606894,-122.07718596145946),new Point(56.036314714039236,-123.80435636586895),new Point(42.3869605962941,-126.17242611586158),new Point(28.17042179327791,-125.00946391075223),new Point(13.953882990262173,-123.84650170564282),new Point(-0.2626558127540193,-122.68353950053347),new Point(-13.738512210404224,-119.10754050164405),new Point(-27.556914286436495,-116.81650742773678),new Point(-39.66357476140456,-110.34665378531616),new Point(-52.51616495744338,-105.07632487543219),new Point(-64.31843452876046,-98.31009284360101),new Point(-75.08370831218872,-90.53416197467243),new Point(-85.65696863170797,-82.57127203273672),new Point(-92.62761794257267,-72.19699879356),new Point(-97.76745059152472,-60.817569036251314),new Point(-102.90728324047586,-49.4381392789424),new Point(-108.04711588942791,-38.05870952163377),new Point(-112.26358356225182,-26.571105201054024),new Point(-114.51270806070352,-14.853021607170774),new Point(-116.82208645703986,-3.6721458334317276),new Point(-115.46032465354665,8.468962305275454))); 
  this.Unistrokes[3] = new Unistroke("Circle", new Array(new Point(-122.30219812712846,1.1368683772161603e-13),new Point(-123.76967013366652,-12.036339013088224),new Point(-121.99699804483691,-24.36245471321476),new Point(-120.07745752626693,-36.727344292111525),new Point(-116.66535543545092,-48.903432559071405),new Point(-113.25325334463514,-61.07952082603131),new Point(-109.31135824446528,-73.05784582139586),new Point(-103.00316774754026,-84.0268853370292),new Point(-93.21151213389192,-92.53669380953744),new Point(-82.38564593737829,-99.89142737628544),new Point(-70.93638213551867,-106.16353603983623),new Point(-58.7647974763637,-110.6411203817679),new Point(-46.23502806965837,-114.40381335089577),new Point(-33.14162465268396,-116.40268359254469),new Point(-19.96472903321603,-118.81805326180333),new Point(-6.840054729289022,-120.70785777218461),new Point(6.440618946658105,-122.28211482434855),new Point(19.823023849888614,-122.23871572463898),new Point(32.972537254205236,-120.51664530729758),new Point(46.12205065852186,-118.79457488995612),new Point(59.27156406283825,-117.07250447261472),new Point(72.26978836926764,-113.87621740645733),new Point(83.10552905393502,-106.86870358788792),new Point(92.67825263832106,-98.06776061724756),new Point(100.89649574827763,-88.17585552214601),new Point(106.74991485809915,-77.15604640401932),new Point(111.34885153914843,-65.48576470138289),new Point(116.3326073630833,-53.844871843752486),new Point(119.59738053610181,-41.74630138989781),new Point(122.8068997479495,-29.57148570732906),new Point(125.25352628000019,-17.29888563571322),new Point(126.23032986633348,-4.750133800582688),new Point(125.65681243522863,7.597170336123611),new Point(122.39190686763254,19.786513959047227),new Point(120.40636480475291,32.091066951669745),new Point(116.5139147696757,44.08784900038222),new Point(111.46822118841328,55.65414364625434),new Point(106.77679363924972,67.35268014561632),new Point(100.93077288992254,78.55904291739375),new Point(94.10622285260456,89.15499499612082),new Point(86.12418800853357,99.24410835442916),new Point(76.59136233052868,107.84808567728982),new Point(66.35100510653433,115.84816479781881),new Point(54.65442197312973,121.05142688629019),new Point(42.34805385445247,125.27454428864371),new Point(29.10129650417116,127.21163554088429),new Point(16.004675539875734,127.71788517565147),new Point(2.829011351985855,126.25063761773379),new Point(-10.334257155491969,125.77535032457371),new Point(-23.483770559808477,124.05327990723231),new Point(-36.481994866237756,120.85699284107494),new Point(-49.480219172667034,117.66070577491752),new Point(-61.118067160399846,112.0668502060492),new Point(-70.9952052977726,105.6857171821469),new Point(-81.09523210791235,97.38155890694236),new Point(-89.05192315114039,87.90455807958324),new Point(-94.91724589241994,76.70504722591079),new Point(-99.19245770881889,64.9315502451916),new Point(-103.93284476763836,53.325968679439484),new Point(-106.90709916184619,41.082862000093826),new Point(-109.34081460562732,29.19561969761736),new Point(-111.04553094019957,17.40728905624752),new Point(-112.54101984467593,5.370296689173983),new Point(-112.37747972469015,-6.628007125471129))); 

	// The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
	//
	this.Recognize = function(points, useProtractor)
	{
		var t0 = Date.now();
		var candidate = new Unistroke("", points);

		var u = -1;
		var b = +Infinity;
		for (var i = 0; i < this.Unistrokes.length; i++) // for each unistroke template
		{
			var d;
			if (useProtractor)
				d = OptimalCosineDistance(this.Unistrokes[i].Vector, candidate.Vector); // Protractor
			else
				d = DistanceAtBestAngle(candidate.Points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision); // Golden Section Search (original $1)
			if (d < b) {
				b = d; // best (least) distance
				u = i; // unistroke index
			}
		}
		var t1 = Date.now();
		return (u === -1) ? new Result("No match.", 0.0, t1-t0) : new Result(this.Unistrokes[u].Name, useProtractor ? (1.0 - b) : (1.0 - b / HalfDiagonal), t1-t0);
	}
	this.AddGesture = function(name, points)
	{
    console.log("Point length: %d", points.length);
		this.Unistrokes[this.Unistrokes.length] = new Unistroke(name, points); // append new unistroke
		var num = 0;

		for (var i = 0; i < this.Unistrokes.length; i++) {
			if (this.Unistrokes[i].Name === name)
				num++;
		}
		return num;
	}
	this.DeleteUserGestures = function()
	{
		this.Unistrokes.length = NumUnistrokes; // clear any beyond the original set
		return NumUnistrokes;
	}
}
//
// Private helper functions from here on down
//
function Resample(points, n)
{
	var I = PathLength(points) / (n - 1); // interval length
	var D = 0.0;
	var newpoints = new Array(points[0]);
	for (var i = 1; i < points.length; i++)
	{
		var d = Distance(points[i-1], points[i]);
		if ((D + d) >= I)
		{
			var qx = points[i-1].X + ((I - D) / d) * (points[i].X - points[i-1].X);
			var qy = points[i-1].Y + ((I - D) / d) * (points[i].Y - points[i-1].Y);
			var q = new Point(qx, qy);
			newpoints[newpoints.length] = q; // append new point 'q'
			points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
			D = 0.0;
		}
		else D += d;
	}
	if (newpoints.length === n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
		newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
	return newpoints;
}
function IndicativeAngle(points)
{
	var c = Centroid(points);
	return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}
function RotateBy(points, radians) // rotates points around centroid
{
	var c = Centroid(points);
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
		var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function ScaleTo(points, size) // non-uniform scale; assumes 2D gestures (i.e., no lines)
{
	var B = BoundingBox(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].X * (size / B.Width);
		var qy = points[i].Y * (size / B.Height);
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function TranslateTo(points, pt) // translates points' centroid
{
	var c = Centroid(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].X + pt.X - c.X;
		var qy = points[i].Y + pt.Y - c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function Vectorize(points) // for Protractor
{
	var sum = 0.0;
	var vector = new Array();
	for (var i = 0; i < points.length; i++) {
		vector[vector.length] = points[i].X;
		vector[vector.length] = points[i].Y;
		sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
	}
	var magnitude = Math.sqrt(sum);
	for (var j = 0; j < vector.length; j++)
		vector[j] /= magnitude;
	return vector;
}
function OptimalCosineDistance(v1, v2) // for Protractor
{
	var a = 0.0;
	var b = 0.0;
	for (var i = 0; i < v1.length; i += 2) {
		a += v1[i] * v2[i] + v1[i+1] * v2[i+1];
		b += v1[i] * v2[i+1] - v1[i+1] * v2[i];
	}
	var angle = Math.atan(b / a);
	return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}
function DistanceAtBestAngle(points, T, a, b, threshold)
{
	var x1 = Phi * a + (1.0 - Phi) * b;
	var f1 = DistanceAtAngle(points, T, x1);
	var x2 = (1.0 - Phi) * a + Phi * b;
	var f2 = DistanceAtAngle(points, T, x2);
	while (Math.abs(b - a) > threshold)
	{
		if (f1 < f2) {
			b = x2;
			x2 = x1;
			f2 = f1;
			x1 = Phi * a + (1.0 - Phi) * b;
			f1 = DistanceAtAngle(points, T, x1);
		} else {
			a = x1;
			x1 = x2;
			f1 = f2;
			x2 = (1.0 - Phi) * a + Phi * b;
			f2 = DistanceAtAngle(points, T, x2);
		}
	}
	return Math.min(f1, f2);
}
function DistanceAtAngle(points, T, radians)
{
	var newpoints = RotateBy(points, radians);
	return PathDistance(newpoints, T.Points);
}
function Centroid(points)
{
	var x = 0.0, y = 0.0;
	for (var i = 0; i < points.length; i++) {
		x += points[i].X;
		y += points[i].Y;
	}
	x /= points.length;
	y /= points.length;
	return new Point(x, y);
}
function BoundingBox(points)
{
	var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
	for (var i = 0; i < points.length; i++) {
		minX = Math.min(minX, points[i].X);
		minY = Math.min(minY, points[i].Y);
		maxX = Math.max(maxX, points[i].X);
		maxY = Math.max(maxY, points[i].Y);
	}
	return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}
function PathDistance(pts1, pts2)
{
	var d = 0.0;
	for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
		d += Distance(pts1[i], pts2[i]);
	return d / pts1.length;
}
function PathLength(points)
{
	var d = 0.0;
	for (var i = 1; i < points.length; i++)
		d += Distance(points[i - 1], points[i]);
	return d;
}
function Distance(p1, p2)
{
	var dx = p2.X - p1.X;
	var dy = p2.Y - p1.Y;
	return Math.sqrt(dx * dx + dy * dy);
}
function Deg2Rad(d) { return (d * Math.PI / 180.0); }



//// END RECONGIZER ////
//#endregion

const UserInputKey = "UserInput";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}


function AddNewInput(X,Y)
{
  let newInput = {
      "Input":[{"x": X, "y": Y}]
  };

  let newInputString = JSON.stringify(newInput);
  localStorage.setItem(UserInputKey,newInputString);
}

function AppendNexInput(X,Y)
{
  let existingInputString = localStorage.getItem(UserInputKey);

  let existingInputObj = JSON.parse(existingInputString);
  existingInputObj['Input'].push({"x": X, "y": Y});

  let newInputString = JSON.stringify(existingInputObj);

  localStorage.setItem(UserInputKey, newInputString);
}


const canvasWidth = window.innerHeight;
const canvasHeight = window.innerHeight;

function App() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const canvasRect = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, /*setLineWidth*/] = useState(5);
    const [lineColor, /*setLineColor*/] = useState("black");
    const [lineOpacity, /*setLineOpacity*/] = useState(1.0);
    const [drawResult, setDrawResult] = useState("");
    const Recognizer = new DollarRecognizer();

    // Initialization when the component
    // mounts for the first time
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
        canvasRect.current = canvas.getBoundingClientRect();
    }, [lineColor, lineOpacity, lineWidth]);

    // Function for starting the drawing
    const startDrawing = (e) => {
      // Reseting all the info
        ctxRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        if(storageAvailable("localStorage"))
          {
              localStorage.removeItem(UserInputKey);
          }
        let x = (e.touches) ? e.touches[0].clientX - canvasRect.current.left : e.nativeEvent.offsetX;
        let y = (e.touches) ? e.touches[0].clientY - canvasRect.current.top: e.nativeEvent.offsetY;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            x,
            y
        );
        setIsDrawing(true);
    };

    const ShapeToEnum = {
      "Circle":0,
      "Star":1,
      "Bow":2,
      "Arrow":3,
      "Volcano":4,
      "Lava":5,
      "Triangle":6
      };

    // Function for ending the drawing
    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);

        let pointArray = new Array();

        if(storageAvailable("localStorage"))
          {
              if(!localStorage.getItem(UserInputKey))
              {
                  return;
              }
              let existingInputString = localStorage.getItem(UserInputKey);
      
              let existingInputObj = JSON.parse(existingInputString);
      
              for(let i = 0; i < existingInputObj['Input'].length; i++)
              {
                  let X = existingInputObj['Input'][i]['x'];
                  let Y = existingInputObj['Input'][i]['y'];
      
                  let newPoint = new Point(X,Y);
                  pointArray.push(newPoint);
              }
          }
      
          let DrawResult = Recognizer.Recognize(pointArray, false);
          let DrawResStr = new String("Draw Result name: %s, score: %f, time: %f", DrawResult.Name, DrawResult.Score, DrawResult.Time);
          let enumResult = ShapeToEnum[DrawResult.Name];
          console.log("Enum result: %d", enumResult);
          console.log(DrawResult);
          setDrawResult(DrawResult.Name);
    };

    const draw = (e) => {
        if (!isDrawing) {
            return;
        }
        let x = (e.touches) ? e.touches[0].clientX - canvasRect.current.left : e.nativeEvent.offsetX;
        let y = (e.touches) ? e.touches[0].clientY - canvasRect.current.top: e.nativeEvent.offsetY;
        if(storageAvailable("localStorage"))
          {
              // If no user input exists create a new one
              if(!localStorage.getItem(UserInputKey))
              {
                  AddNewInput(x,y);
              }
              // If it exists append to existing data
              else
              {
                  AppendNexInput(x,y);
              }
          }

        ctxRef.current.lineTo(
            x,
            y
            
        );

        ctxRef.current.stroke();
    };

    const AddTemplate = () => {
      let pointArray = new Array();

      if(storageAvailable("localStorage"))
        {
            if(!localStorage.getItem(UserInputKey))
            {
                return;
            }
            let existingInputString = localStorage.getItem(UserInputKey);
    
            let existingInputObj = JSON.parse(existingInputString);
    
            for(let i = 0; i < existingInputObj['Input'].length; i++)
            {
                let X = existingInputObj['Input'][i]['x'];
                let Y = existingInputObj['Input'][i]['y'];
    

                pointArray.push(new Point(X,Y));
            }
        }
        let newUnistroke = new Unistroke("Temp", pointArray);

        let newJsonArray = {"Points":[]};
        for(let j = 0; j < newUnistroke.Points.length; j++)
        {
          let newPoint = {"x":newUnistroke.Points[j].X, "y":newUnistroke.Points[j].Y};
          newJsonArray["Points"].push(newPoint);
        }
        console.log(newJsonArray);

    };

    
    return (
      <div className="App">
      <div>
        <section class="ipcon">   
				<h1>Drawing of the Dead Web</h1>
				<input type="text" id="ipAddress" defaultValue="10.232.73.129" />
				<button onClick={connectToServer}>Connect</button>
				</section>
			</div>  
          <button type="button" onClick={AddTemplate}>Add Template</button>
          <span>{drawResult}</span>
          <div className="draw-area">
              <canvas
                  onMouseDown={startDrawing}
                  onMouseUp={endDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={endDrawing}
                  onTouchMove={draw}
                  ref={canvasRef}
                  width={canvasWidth}
                  height={canvasHeight}
              />
          </div>

      </div>
  );


    
}

export default App;